"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const NumTS_1 = require("../math/NumTS");
const ActivationLayer_1 = require("./ActivationLayer");
const FullyConectedLayer_1 = require("./FullyConectedLayer");
class Network {
    constructor() {
        /**
         * This map contains the name of all the loss functions and their
         * prime function
         */
        this.lossFunctionsMap = new Map([
            ["Binary Cross Entropy", NumTS_1.NumTS.binary_cross_entropyPrime],
            ["Mean Square Error", NumTS_1.NumTS.msePrime]
        ]);
        /**
          * This map contains the name of all the activation functions and their
          * prime function
          */
        this.activationFunctionsMap = new Map([
            ["TanH", NumTS_1.NumTS.matrixTanhPrime],
            ["Sigmoid", NumTS_1.NumTS.matrixSigmoidPrime],
            ["Linear", NumTS_1.NumTS.matrixLinearPrime]
        ]);
        //constants
        this.maxNumberOfNeurons = 4;
        this.maxNumberOfLayers = 3;
        this.all_outputs = [];
        this.layers = [];
        this.lossFunction = NumTS_1.NumTS.mse;
        this.lossFunctionPrime = NumTS_1.NumTS.msePrime;
        this.currEpoch = 0;
        this.learningRate = 0.1;
        this.x_train = [];
        this.y_train = [];
        this.current_datapoint_index = 0;
        this.current_layer = 0;
        this.direction = 0;
        this.current_error = 0;
        this.current_outputs = [];
        this.current_output = [];
        this.current_backProp_errors = [];
        this.current_backProp_error = [];
        this.output_size = 1;
        this.dataSize = 0;
        this.layersN = 0;
        this.actFunc = [];
        this.lossFunc = "";
        this.neuronPerLayer = [];
    }
    /**
     * This method will always return the derivative of a certain activation function
     * it cant never return a null value since the universe of keys is always
     * limited to available ones
     */
    getActivationFunctionDerivative(key) {
        return this.activationFunctionsMap.get(key);
    }
    /**
     * This method will always return the derivative of a certain loss function
     * it cant never return a null value since the universe of keys is always
     * limited to available ones
     */
    getLossFunctionDerivative(key) {
        return this.lossFunctionsMap.get(key);
    }
    /**
    *This method retrieves all the activation Funcions
     */
    getAllActivationFunctions() {
        let result = new Array();
        for (let key of this.activationFunctionsMap.keys()) {
            result.push(key);
        }
        return result;
    }
    /**
    *This method retrieves all the loss Funcions
     */
    getAllLossFunctions() {
        let result = new Array();
        for (let key of this.lossFunctionsMap.keys()) {
            result.push(key);
        }
        return result;
    }
    /**
    *This method retrieves the maximun number of neurons allowed
     */
    getMaxNumberOfNeurons() {
        return this.maxNumberOfNeurons;
    }
    /**
    *This method retrieves the maximun number of layers allowed
     */
    getMaxNumberOfLayers() {
        return this.maxNumberOfLayers;
    }
    getLayers() {
        return this.layers;
    }
    layerStep() {
        if (this.current_outputs.length == 0) { // initializes the first output for every sample in x_train
            for (let j = 0; j < this.x_train.length; j++) {
                let curr = [];
                curr[0] = this.x_train[j];
                this.current_outputs[j] = curr;
            }
        }
        if (this.direction == 0) { //forward propagation
            this.current_output = this.current_outputs[this.current_datapoint_index];
            this.current_output = this.layers[this.current_layer].forwardPropagation(this.current_output); // does the forward propagation for the sample "j" in x_train
            this.current_outputs[this.current_datapoint_index] = this.current_output; // assigns the new values
            this.all_outputs.push(this.current_output);
            if (this.current_layer == this.layers.length - 1) { // in case forward its over, then it calculates the error in order to start backwards propagation in the next step
                let targetOutput = [this.y_train[this.current_datapoint_index]]; // calculates the error comparing to the true expected value "j" in y_train
                this.current_error += this.lossFunction(this.current_output, targetOutput);
                let errorForBackwardProp = this.lossFunctionPrime(this.current_output, targetOutput);
                this.current_backProp_errors[this.current_datapoint_index] = errorForBackwardProp;
            }
            if (this.current_layer == this.layers.length - 1) { // in case the forward prop is over, it changes the direction of the propagation to backwards propagation
                this.direction = 1;
            }
            else {
                this.current_layer++; // advances one layer
            }
        }
        else if (this.direction == 1) { //backwards propagation
            this.current_backProp_error = this.current_backProp_errors[this.current_datapoint_index];
            this.current_backProp_errors[this.current_datapoint_index] = this.layers[this.current_layer].backPropagation(this.current_backProp_error, this.learningRate); // does the backwards propagation for the sample "j" in current_backProp_errors
            if (this.current_layer == 0) {
                this.direction = 0;
                this.current_datapoint_index++;
                this.all_outputs = []; //resets the array of outputs that is shown in the visualization
                // -- resets the values for the next epoch
                if (this.current_datapoint_index == this.x_train.length) {
                    this.currEpoch++;
                    this.current_error /= this.x_train.length;
                    console.log("Epoch " + this.currEpoch + " error = " + this.current_error);
                    this.current_outputs = [];
                    this.current_output = [];
                    this.current_backProp_errors = [];
                    this.current_backProp_error = [];
                    this.current_error = 0;
                    this.current_datapoint_index = 0;
                }
                // --
            }
            if (this.current_layer > 0) {
                this.current_layer--;
            }
        }
    }
    //might not work, please check if there is a problem with the switch
    selectFunction(F) {
        let result = new Function;
        switch (F) {
            case "Mean Square Error": {
                result = NumTS_1.NumTS.mse;
                break;
            }
            case "Binary Cross Entropy": {
                result = NumTS_1.NumTS.binary_cross_entropy;
                break;
            }
            case "TanH": {
                result = NumTS_1.NumTS.matrixTanh;
                break;
            }
            case "Sigmoid": {
                result = NumTS_1.NumTS.matrixSigmoid;
                break;
            }
            case "Linear": {
                result = NumTS_1.NumTS.matrixLinear;
                break;
            }
        }
        return result;
    }
    /* buildCustomNeuralNetwork(dataSize: number, layersN: number, actFunc: Array<String>, lossFunc: String, neuronPerLayer: Array<number>): Network {
        this.x_train = [[0, 0], [0, 1], [1, 0], [1, 1]];
        this.y_train = [[0], [1], [1], [0]];
        this.layers = [];
        let result = new Network;
        if (actFunc.length == layersN) {
            if (layersN == 1) {
                this.addLayer(new FullyConectedLayer(dataSize, neuronPerLayer[0]));
                this.addLayer(new ActivationLayer(this.selectFunction(actFunc[0]), this.getActivationFunctionDerivative(actFunc[0])));
                this.addLayer(new FullyConectedLayer(neuronPerLayer[0], neuronPerLayer[0]));
                this.addLayer(new ActivationLayer(this.selectFunction(actFunc[0]), this.getActivationFunctionDerivative(actFunc[0])));
                this.addLayer(new FullyConectedLayer(neuronPerLayer[0], 1));
                this.addLayer(new ActivationLayer(this.selectFunction(actFunc[0]), this.getActivationFunctionDerivative(actFunc[0])));
            } else {
                for (var i = 0; i < layersN; i++) {

                    if (i == 0) {

                        this.addLayer(new FullyConectedLayer(dataSize, neuronPerLayer[i]));
                        this.addLayer(new ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));


                        this.addLayer(new FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
                        this.addLayer(new ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));


                    } else if (i == layersN - 1) {


                        this.addLayer(new FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i]));
                        this.addLayer(new ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));


                        this.addLayer(new FullyConectedLayer(neuronPerLayer[i], this.output_size));
                        this.addLayer(new ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));

                    } else {

                        this.addLayer(new FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
                        this.addLayer(new ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
                    }
                }
            }

            this.setLossFunction(this.selectFunction(lossFunc), this.getLossFunctionDerivative(lossFunc));
            return this;
        } else {
            alert("juemadre vida");
            return result;

        }
    } */
    /**
    *This method creates a new custom neural network speficit values the user
    desires
     */
    buildCustomNeuralNetwork(xDataPoints, yDataPoints, outputS, dataSize, layersN, actFunc, lossFunc, neuronPerLayer) {
        //we store this info, to later save the network config
        this.dataSize = dataSize;
        this.layersN = layersN;
        this.actFunc = actFunc;
        this.lossFunc = lossFunc;
        this.neuronPerLayer = neuronPerLayer;
        //-------
        this.x_train = xDataPoints;
        this.y_train = yDataPoints;
        this.output_size = outputS;
        this.layers = [];
        if (layersN == 1) {
            this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(dataSize, neuronPerLayer[0]));
            this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[0]), this.getActivationFunctionDerivative(actFunc[0])));
            this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[0], neuronPerLayer[0]));
            this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[0]), this.getActivationFunctionDerivative(actFunc[0])));
            this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[0], this.output_size));
            this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[0]), this.getActivationFunctionDerivative(actFunc[0])));
        }
        else {
            for (var i = 0; i < layersN; i++) {
                if (i == 0) {
                    this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(dataSize, neuronPerLayer[i]));
                    this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
                    this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
                    this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
                }
                else if (i == layersN - 1) {
                    this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i]));
                    this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
                    this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], this.output_size));
                    this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
                }
                else {
                    this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
                    this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
                }
            }
        }
        this.setLossFunction(this.selectFunction(lossFunc), this.getLossFunctionDerivative(lossFunc));
        return this;
    }
    addLayer(layer) {
        this.layers.push(layer);
    }
    setLearningRate(lr) {
        this.learningRate = lr;
    }
    setLossFunction(lossFunc, lossFuncPrime) {
        this.lossFunction = lossFunc;
        this.lossFunctionPrime = lossFuncPrime;
    }
    setTrainingSet(x, y) {
        this.x_train = x;
        this.y_train = y;
    }
    predict(inputData) {
        let result = [];
        for (let i = 0; i < inputData.length; i++) {
            let output = [inputData[i]];
            for (let j = 0; j < this.layers.length; j++) {
                output = this.layers[j].forwardPropagation(output);
            }
            result.push(output);
        }
        return result;
    }
    fitTo(targetEpoch) {
        for (; this.currEpoch < targetEpoch; ++this.currEpoch) {
            let error = 0;
            console.log(error);
            for (let j = 0; j < this.x_train.length; j++) {
                let output = [];
                output[0] = this.x_train[j];
                for (let k = 0; k < this.layers.length; k++) {
                    output = this.layers[k].forwardPropagation(output);
                }
                let targetOutput = [this.y_train[j]];
                error += this.lossFunction(output, targetOutput);
                let errorForBackwardProp = this.lossFunctionPrime(output, targetOutput);
                for (let k = this.layers.length - 1; k >= 0; k--) {
                    errorForBackwardProp = this.layers[k].backPropagation(errorForBackwardProp, this.learningRate);
                }
            }
        }
    }
    goToNextEpoch() {
        let error = 0;
        console.log(error);
        for (let j = 0; j < this.x_train.length; j++) {
            let output = [];
            output[0] = this.x_train[j];
            for (let k = 0; k < this.layers.length; k++) {
                output = this.layers[k].forwardPropagation(output);
            }
            let targetOutput = [this.y_train[j]];
            error += this.lossFunction(output, targetOutput);
            let errorForBackwardProp = this.lossFunctionPrime(output, targetOutput);
            for (let k = this.layers.length - 1; k >= 0; k--) {
                errorForBackwardProp = this.layers[k].backPropagation(errorForBackwardProp, this.learningRate);
            }
        }
        this.currEpoch++;
    }
    fit(x_train, y_train, epochs, learningRate) {
        for (let i = 0; i < epochs; i++) {
            let error = 0;
            for (let j = 0; j < x_train.length; j++) {
                let output = [];
                output[0] = x_train[j];
                for (let k = 0; k < this.layers.length; k++) {
                    output = this.layers[k].forwardPropagation(output);
                }
                let targetOutput = [y_train[j]];
                error += this.lossFunction(output, targetOutput);
                let errorForBackwardProp = this.lossFunctionPrime(output, targetOutput);
                for (let k = this.layers.length - 1; k >= 0; k--) {
                    errorForBackwardProp = this.layers[k].backPropagation(errorForBackwardProp, learningRate);
                }
            }
            error /= x_train.length;
            console.log("Epoch " + i + " error = " + error);
        }
    }
}
exports.Network = Network;
