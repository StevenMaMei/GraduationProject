"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumTS_1 = require("../math/NumTS");
class Network {
    constructor() {
        this.layers = [];
        this.lossFunction = NumTS_1.NumTS.mse;
        this.lossFunctionPrime = NumTS_1.NumTS.msePrime;
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
            let output = inputData;
            for (let j = 0; j < this.layers.length; j++) {
                output = this.layers[j].forwardPropagation(output);
            }
            result.push(output);
        }
        return result;
    }
    fit(x_train, y_train, epochs, learningRate) {
        for (let i = 0; i < epochs; i++) {
            let error = 0;
            for (let j = 0; j < x_train.length; j++) {
                let output = [];
                output[0] = x_train[j];
                for (let k = 0; k < this.layers.length; k++) {
                    output = this.layers[i].forwardPropagation(output);
                }
                error += this.lossFunction(output, y_train[j]);
                let errorForBackwardProp = this.lossFunctionPrime(output, y_train);
                for (let k = this.layers.length - 1; k >= 0; k--) {
                    errorForBackwardProp = this.layers[k].backPropagation(errorForBackwardProp, learningRate);
                }
            }
            error /= x_train.length;
            console.log("Epoch " + i + " error = " + error);
        }
    }
}
