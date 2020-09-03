"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Network_1 = require("../neuralNetwork/Network");
let x_train = [[0, 0], [0, 1], [1, 0], [1, 1]];
let y_train = [[0], [1], [1], [0]];
/**
let fullyConectedNetwork: Network= new Network();
fullyConectedNetwork.addLayer(new FullyConectedLayer(2,3));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(3,1));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));

fullyConectedNetwork.setLossFunction(NumTS.binary_cross_entropy,NumTS.binary_cross_entropyPrime);

fullyConectedNetwork.fit(x_train,y_train, 300,0.1);
*/
let testclass = new Network_1.Network();
let test = testclass.buildCustomNeuralNetwork(2, 3, new Array("TanH", "TanH"), "Binary Cross Entropy", new Array(2, 3, 4));
test.fit(x_train, y_train, 300, 0.1);
//let result : number[][][]= fullyConectedNetwork.predict(x_train);
let result = test.predict(x_train);
console.log(result);
