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
    /* backPropagation(errorRespectToOutput: number[][], learningRate: number): number[][] {
        console.log(learningRate)
        return NumTS.matrixElemtWiseMult(this.activationFunctionDerived(this.input),errorRespectToOutput);
    } */
    backPropagation(errorRespectToOutput) {
        return NumTS_1.NumTS.matrixElemtWiseMult(this.activationFunctionDerived(this.input), errorRespectToOutput);
    }
}
exports.ActivationLayer = ActivationLayer;
