"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullyConectedLayer = void 0;
const NumTS_1 = require("../math/NumTS");
class FullyConectedLayer {
    constructor(inputSize, outputSize) {
        this.weights = [];
        this.bias = [];
        this.input = [];
        this.output = [];
        for (let i = 0; i < inputSize; i++) {
            this.weights[i] = [];
            for (let j = 0; j < outputSize; j++) {
                this.weights[i][j] = Math.random();
            }
        }
        this.bias[0] = [];
        for (let i = 0; i < outputSize; i++) {
            this.bias[0][i] = Math.random();
        }
    }
    forwardPropagation(inputData) {
        this.input = inputData;
        this.output = NumTS_1.NumTS.matrixDotProduct(this.input, this.weights);
        this.output = NumTS_1.NumTS.matrixSum(this.output, this.bias);
        return this.output;
    }
    backPropagation(errorRespectToOutput, learningRate) {
        let errorRespectToInput = NumTS_1.NumTS.matrixDotProduct(errorRespectToOutput, NumTS_1.NumTS.matrixTransposse(this.weights));
        let errorRespectWeights = NumTS_1.NumTS.matrixDotProduct(NumTS_1.NumTS.matrixTransposse(this.input), errorRespectToOutput);
        errorRespectWeights = NumTS_1.NumTS.matrixMultWithSingleValue(errorRespectWeights, -learningRate);
        this.weights = NumTS_1.NumTS.matrixSum(this.weights, errorRespectWeights);
        this.bias = NumTS_1.NumTS.matrixSum(this.bias, NumTS_1.NumTS.matrixMultWithSingleValue(errorRespectToOutput, -learningRate));
        return errorRespectToInput;
    }
}
exports.FullyConectedLayer = FullyConectedLayer;
