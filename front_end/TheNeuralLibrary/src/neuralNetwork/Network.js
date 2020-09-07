"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const NumTS_1 = require("../math/NumTS");
const ActivationLayer_1 = require("./ActivationLayer");
const FullyConectedLayer_1 = require("./FullyConectedLayer");
class Network {
    constructor() {
        this.lossFunctionsMap = new Map([
            ["Binary Cross Entropy", NumTS_1.NumTS.binary_cross_entropyPrime],
            ["Mean Square Error", NumTS_1.NumTS.msePrime]
        ]);
        this.activationFunctionsMap = new Map([
            ["TanH", NumTS_1.NumTS.matrixTanhPrime],
        ]);
        //constants
        this.maxNumberOfNeurons = 8;
        this.maxNumberOfLayers = 8;
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
    }
    // it cant never return a null value since the universe of keys is always limited to available ones
    getActivationFunctionDerivative(key) {
        return this.activationFunctionsMap.get(key);
    };
    // it cant never return a null value since the universe of keys is always limited to available ones
    getLossFunctionDerivative(key) {
        return this.lossFunctionsMap.get(key);
    };
    getAllActivationFunctions() {
        let result = new Array();
        for (let key of this.activationFunctionsMap.keys()) {
            result.push(key);
        }
        return result;
    };
    getAllLossFunctions() {
        let result = new Array();
        for (let key of this.lossFunctionsMap.keys()) {
            result.push(key);
        }
        return result;
    };
    getMaxNumberOfNeurons() {
        return this.maxNumberOfNeurons;
    };
    getMaxNumberOfLayers() {
        return this.maxNumberOfLayers;
    };
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
            if (this.current_layer == this.layers.length - 2) { // in case forward its over, then it calculates the error in order to start backwards propagation in the next step
                let targetOutput = [this.y_train[this.current_datapoint_index]]; // calculates the error comparing to the true expected value "j" in y_train
                this.current_error += this.lossFunction(this.current_output, targetOutput);
                let errorForBackwardProp = this.lossFunctionPrime(this.current_output, targetOutput);
                this.current_backProp_errors[this.current_datapoint_index] = errorForBackwardProp;
            }
            this.current_layer++; // advances one layer
            if (this.current_layer == this.layers.length - 1) { // in case the forward prop is over, it changes the direction of the propagation to backwards propagation
                this.direction = 1;
            }
        }
        else if (this.direction == 1) { //backwards propagation
            this.current_backProp_error = this.current_backProp_errors[this.current_datapoint_index];
            this.current_backProp_errors[this.current_datapoint_index] = this.layers[this.current_layer].backPropagation(this.current_backProp_error, this.learningRate); // does the backwards propagation for the sample "j" in current_backProp_errors
            this.current_layer = this.current_layer - 1;
            if (this.current_layer == 0) {
                this.direction = 0;
                this.current_datapoint_index++;
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
        }
        return result;
    };
    buildCustomNeuralNetwork(dataSize, layers, actFunc, lossFunc, neuronPerLayer) {
        let net = new Network();
        for (var i = 0; i < layers; i++) {
            if (i == 0) {
                net.addLayer(new FullyConectedLayer_1.FullyConectedLayer(dataSize, neuronPerLayer[i + 1]));
                net.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
            }
            else if (i == layers - 1) {
                net.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], 1));
                net.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
            }
            net.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
            net.addLayer(new ActivationLayer_1.ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
        }
        net.setLossFunction(this.selectFunction(lossFunc), this.getLossFunctionDerivative(lossFunc));
        return net;
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
