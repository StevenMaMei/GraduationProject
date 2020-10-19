"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivationLayer = void 0;
const NumTS_1 = require("../math/NumTS");
class ActivationLayer {
    constructor(activation, activationPrime) {
        this.input = [];
        this.output = [];
        this.activationFunction = activation;
        this.activationFunctionDerived = activationPrime;
    }
    forwardPropagation(inputData) {
        this.input = inputData;
        this.output = this.activationFunction(this.input);
        return this.output;
    }
    //needs to be tested
    backPropagation(errorRespectToOutput, learningRate) {
        console.log(learningRate);
        return NumTS_1.NumTS.matrixElemtWiseMult(this.activationFunctionDerived(this.input), errorRespectToOutput);
    }
}
exports.ActivationLayer = ActivationLayer;
