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
//fullyConectedNetwork.fit(x_train,y_train, 300,0.1);
/**
let testclass: Network = new Network();

let test: Network = testclass.buildCustomNeuralNetwork(2, 3, new Array("TanH","TanH"),
"Binary Cross Entropy", new Array(2, 3, 4));
test.fit(x_train, y_train, 300, 0.1);
*/
//let result : number[][][]= fullyConectedNetwork.predict(x_train);
//let result: number[][][] = test.predict(x_train);
let layer = new FullyConectedLayer_1.FullyConectedLayer(2, 4);
let a = [[1, 3], [9, 6]];
let b = [[1, 5], [6, 4]];
let d = 2;
/**
let a:number[][]= [[2]];
let b: number[][]=[[2],[3]];
let c: number[][]= [[1,2],[3,4]];
*/
let net = new Network_1.Network();
//let layer1: ActivationLayer = new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime);
let c = [[1, 2]];
//layer.forwardPropagation(c);
console.log(layer.forwardPropagation(c));
//console.log(net.buildCustomNeuralNetwork(2,1,["TanH"],"Mean Square Error",[3]));
/**
console.log("----RESULTS---"+"\n"+
layer.forwardPropagation(a)+"\n"+
layer.forwardPropagation(b)+"\n"+
layer.forwardPropagation(c)+"\n");
*/
//console.log(result);
