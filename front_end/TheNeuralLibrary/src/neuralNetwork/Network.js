"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const NumTS_1 = require("../math/NumTS");
const ActivationLayer_1 = require("./ActivationLayer");
const FullyConectedLayer_1 = require("./FullyConectedLayer");
class Network {
    constructor() {
        this.layers = [];
        this.lossFunction = NumTS_1.NumTS.mse;
        this.lossFunctionPrime = NumTS_1.NumTS.msePrime;
        this.currEpoch = 0;
        this.learningRate = 0.1;
        this.x_train = [];
        this.y_train = [];
    }
    buildCustomNeuralNetwork(dataSize, layers, actFunc, actFuncPrime, lossFunc, lossFuncPrime, neuronPerLayer) {
        let net = new Network();
        for (var i = 0; i < layers; i++) {
            if (i == 0) {
                net.addLayer(new FullyConectedLayer_1.FullyConectedLayer(dataSize, neuronPerLayer[i + 1]));
                net.addLayer(new ActivationLayer_1.ActivationLayer(actFunc, actFuncPrime));
            }
            else if (i == layers - 1) {
                net.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], 1));
                net.addLayer(new ActivationLayer_1.ActivationLayer(actFunc, actFuncPrime));
            }
            net.addLayer(new FullyConectedLayer_1.FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
            net.addLayer(new ActivationLayer_1.ActivationLayer(actFunc, actFuncPrime));
        }
        net.setLossFunction(lossFunc, lossFuncPrime);
        return net;
    }
    addLayer(layer) {
        this.layers.push(layer);
    }
    setLossFunction(lossFunc, lossFuncPrime) {
        this.lossFunction = lossFunc;
        this.lossFunctionPrime = lossFuncPrime;
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
