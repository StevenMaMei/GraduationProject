"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumTS_1 = require("../math/NumTS");
const ActivationLayer_1 = require("../neuralNetwork/ActivationLayer");
const FullyConectedLayer_1 = require("../neuralNetwork/FullyConectedLayer");
const Network_1 = require("../neuralNetwork/Network");
let x_train = [[0, 0], [0, 1], [1, 0], [1, 1]];
let y_train = [[0], [1], [1], [0]];
let fullyConectedNetwork = new Network_1.Network();
fullyConectedNetwork.addLayer(new FullyConectedLayer_1.FullyConectedLayer(2, 3));
fullyConectedNetwork.addLayer(new ActivationLayer_1.ActivationLayer(NumTS_1.NumTS.matrixTanh, NumTS_1.NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer_1.FullyConectedLayer(3, 1));
fullyConectedNetwork.addLayer(new ActivationLayer_1.ActivationLayer(NumTS_1.NumTS.matrixTanh, NumTS_1.NumTS.matrixTanhPrime));
fullyConectedNetwork.setLossFunction(NumTS_1.NumTS.mse, NumTS_1.NumTS.msePrime);
fullyConectedNetwork.fit(x_train, y_train, 300, 0.1);
let result = fullyConectedNetwork.predict(x_train);
console.log(result);
