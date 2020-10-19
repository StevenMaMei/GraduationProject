"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActivationLayer_1 = require("../neuralNetwork/ActivationLayer");
const FullyConectedLayer_1 = require("../neuralNetwork/FullyConectedLayer");
const Network_1 = require("../neuralNetwork/Network");
const NumTS_1 = require("../math/NumTS");
let x_train = [[0, 0], [0, 1], [1, 0], [1, 1]];
let y_train = [[0], [1], [1], [0]];
let fullyConectedNetwork = new Network_1.Network();
fullyConectedNetwork.addLayer(new FullyConectedLayer_1.FullyConectedLayer(2, 3));
fullyConectedNetwork.addLayer(new ActivationLayer_1.ActivationLayer(NumTS_1.NumTS.matrixTanh, NumTS_1.NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer_1.FullyConectedLayer(3, 1));
fullyConectedNetwork.addLayer(new ActivationLayer_1.ActivationLayer(NumTS_1.NumTS.matrixTanh, NumTS_1.NumTS.matrixTanhPrime));
fullyConectedNetwork.setLossFunction(NumTS_1.NumTS.mse, NumTS_1.NumTS.msePrime);
fullyConectedNetwork.fit(x_train, y_train, 400, 0.1);
/**
let testclass: Network = new Network();

let test: Network = testclass.buildCustomNeuralNetwork(2, 3, new Array("TanH","TanH"),
"Binary Cross Entropy", new Array(2, 3, 4));
test.fit(x_train, y_train, 300, 0.1);
*/
let result = fullyConectedNetwork.predict(x_train);
//let result: number[][][] = test.predict(x_train);
let layer = new ActivationLayer_1.ActivationLayer(NumTS_1.NumTS.matrixTanh, NumTS_1.NumTS.matrixTanhPrime);
let a = [[1, 2]];
let b = [[10]];
let c = [[2], [3]];
let d = 2;
console.log(NumTS_1.NumTS.binary_cross_entropyPrime([[0.1, 0.2, 0.3]], [[0.15, 0.23, 0.26]]));
console.log("----RESULTS---" + "\n" +
    NumTS_1.NumTS.matrixLinearPrime(a) + "\n" +
    NumTS_1.NumTS.matrixLinearPrime(b) + "\n" +
    NumTS_1.NumTS.matrixLinearPrime(c) + "\n");
//console.log(result);
