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
        this.isLayerStep = false;
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
        this.step = new Array();
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
            this.isLayerStep = true;
        }
        if (this.direction == 0) { //forward propagation
            this.step = new Array();
            this.current_output = this.current_outputs[this.current_datapoint_index];
            this.current_output = this.layers[this.current_layer].forwardPropagation(this.current_output); // does the forward propagation for the sample "j" in x_train
            this.step.push("Forward Propagation");
            if (this.current_layer % 2 != 0) {
                for (let i = 0; i < this.layers[this.current_layer].output[0].length; i++) {
                    let actLayer = this.layers[this.current_layer];
                    let normLayer = this.layers[this.current_layer - 1];
                    let weights = normLayer.getWeights();
                    let line = this.round(actLayer.output[0][i]) + " = " + this.actFunc[Math.floor(this.current_layer / 2)] + "[";
                    for (let j = 0; j < normLayer.input[0].length; j++) {
                        line += "(" + this.round(normLayer.input[0][j]) + " * " + this.round(weights[j][i]) + " + " + this.round(normLayer.getBias()[0][i]) + ")";
                        if (j < normLayer.input[0].length - 1) {
                            line += " + ";
                        }
                    }
                    line += " ]";
                    this.step.push(line);
                }
            }
            this.current_outputs[this.current_datapoint_index] = this.current_output; // assigns the new values
            this.all_outputs.push(this.current_output);
            if (this.current_layer == this.layers.length - 1) { // in case forward its over, then it calculates the error in order to start backwards propagation in the next step
                /* this.step =  new Array<string>(); */
                this.step.push(" -------------------------------------------------------- ");
                let targetOutput = [this.y_train[this.current_datapoint_index]]; // calculates the error comparing to the true expected value "j" in y_train
                this.step.push("target Output= " + [this.y_train[this.current_datapoint_index]]);
                this.current_error += this.lossFunction(this.current_output, targetOutput);
                this.step.push("Current error");
                let a = this.roundMatrix(this.current_output);
                let b = this.roundMatrix(targetOutput);
                this.step.push(this.lossFunction.name + "(" + a + " , " + b + ")= " + this.round(this.lossFunction(this.current_output, targetOutput)));
                let errorForBackwardProp = this.lossFunctionPrime(this.current_output, targetOutput);
                this.step.push("Error For Backward Prop");
                this.step.push(this.lossFunctionPrime.name + "(" + a + " , " + b + ")= " + this.roundMatrix(this.lossFunctionPrime(this.current_output, targetOutput)));
                this.current_backProp_errors[this.current_datapoint_index] = errorForBackwardProp;
            }
            if (this.current_layer == this.layers.length - 1) { // in case the forward prop is over, it changes the direction of the propagation to backwards propagation
                this.direction = 1;
            }
            else {
                this.current_layer++; // advances one layer
            }
        }
        else if (this.direction == 1) { //back propagation
            this.current_backProp_error = this.current_backProp_errors[this.current_datapoint_index];
            this.current_backProp_errors[this.current_datapoint_index] = this.layers[this.current_layer].backPropagation(this.current_backProp_error, this.learningRate); // does the backwards propagation for the sample "j" in current_backProp_errors
            let learningRate = this.learningRate;
            if (this.current_layer % 2 != 0) {
                this.step = new Array();
                let normLayer = this.layers[this.current_layer - 1];
                for (let i = 0; i < normLayer.input[0].length; i++) {
                    let weights = normLayer.getWeights();
                    let bias = normLayer.getBias();
                    let input = normLayer.getInput();
                    let index = i + 1;
                    this.step.push("-------------------- Neuron number " + index + " --------------------");
                    this.step.push("Error Respect to Weights:");
                    let aux1 = NumTS_1.NumTS.matrixTransposse(input)[i][0] * this.current_backProp_error[0][0];
                    let res = aux1 * (-learningRate);
                    this.step.push(" [" + this.round(res) + " ={ transpose( " + this.roundMatrix(input) + " ) * " + this.round(this.current_backProp_error[0][0]) + "} * " + -this.round(learningRate) + " ]");
                    this.step.push(" ");
                    this.step.push("Weights:");
                    for (let j = 0; j < this.layers[this.current_layer].output[0].length; j++) {
                        let aux1 = NumTS_1.NumTS.matrixTransposse(input)[i][0] * this.current_backProp_error[0][0];
                        let aux2 = aux1 * -learningRate;
                        let res = aux2 + weights[i][j];
                        this.step.push(" [" + this.round(res) + " = Error Respect to Weights + " + this.round(weights[i][j]) + " ]");
                        if (j < this.layers[this.current_layer].output[0].length - 1) {
                            this.step.push(" ");
                        }
                    }
                    this.step.push("Bias:");
                    for (let j = 0; j < this.layers[this.current_layer].output[0].length; j++) {
                        let fist = this.current_backProp_error[0][0] * (-this.learningRate);
                        let result = bias[0][j] + fist;
                        this.step.push(" [" + this.round(result) + " = " + this.round(bias[0][j]) + " + " + " [" + this.round(this.current_backProp_error[0][0]) + " X " + -this.round(this.learningRate) + " ]");
                        if (j < this.layers[this.current_layer].output[0].length - 1) {
                            this.step.push(" ");
                        }
                    }
                }
            }
            if (this.current_layer == 0) {
                this.direction = 0;
                this.current_datapoint_index++;
                this.all_outputs = []; //resets the array of outputs that is shown in the visualization
                // -- resets the values for the next epoch
                if (this.current_datapoint_index == this.x_train.length) {
                    this.currEpoch++;
                    this.current_error /= this.x_train.length;
                    this.current_outputs = [];
                    this.current_output = [];
                    this.current_backProp_errors = [];
                    this.current_backProp_error = [];
                    this.current_error = 0;
                    this.current_datapoint_index = 0;
                    this.isLayerStep = false;
                }
                // --
            }
            if (this.current_layer > 0) {
                this.current_layer--;
            }
        }
        return this.step;
    }
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
        if (layersN == 1) {
            this.neuronPerLayer[1] = 0;
        }
        //-------
        this.x_train = xDataPoints;
        this.y_train = yDataPoints;
        this.output_size = outputS;
        this.layers = [];
        if (layersN == 1) {
            this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(dataSize, neuronPerLayer[0]));
            this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[0]), this.getActivationFunctionDerivative(actFunc[0])));
            this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[0], this.output_size));
            if (this.lossFunc == "Mean Square Error") {
                this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction("Linear"), this.getActivationFunctionDerivative("Linear")));
                this.actFunc.push("Linear");
            }
            else {
                this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction("Sigmoid"), this.getActivationFunctionDerivative("Sigmoid")));
                this.actFunc.push("Sigmoid");
            }
        }
        else {
            for (var i = 0; i < layersN; i++) {
                if (i == 0) {
                    this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(dataSize, neuronPerLayer[i]));
                    this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
                    this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
                    this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i + 1]), this.getActivationFunctionDerivative(actFunc[i + 1])));
                }
                else if (i == layersN - 1) {
                    this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], this.output_size));
                    if (this.lossFunc == "Mean Square Error") {
                        this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction("Linear"), this.getActivationFunctionDerivative("Linear")));
                        this.actFunc.push("Linear");
                    }
                    else {
                        this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction("Sigmoid"), this.getActivationFunctionDerivative("Sigmoid")));
                        this.actFunc.push("Sigmoid");
                    }
                }
                else {
                    this.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
                    this.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i + 1]), this.getActivationFunctionDerivative(actFunc[i + 1])));
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
            error * 1;
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
        error * 1;
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
            error * 1;
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
        }
    }
    round(value) {
        return Number(Math.round(value * 10000) / 10000);
    }
    roundMatrix(value) {
        var x = 0;
        var y = 0;
        var len = value.length;
        var leny = value[0].length;
        while (x < len) {
            while (y < leny) {
                value[x][y] = this.round(value[x][y]);
                y++;
            }
            x++;
        }
        return value;
    }
}
exports.Network = Network;
