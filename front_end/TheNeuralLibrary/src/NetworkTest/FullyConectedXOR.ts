import { ActivationLayer } from "../neuralNetwork/ActivationLayer"
import { FullyConectedLayer } from "../neuralNetwork/FullyConectedLayer"
import { Network } from "../neuralNetwork/Network"

import { NumTS } from "../math/NumTS";

let x_train: number[][] = [[0, 0], [0, 1], [1, 0], [1, 1]];
let y_train: number[][] = [[0], [1], [1], [0]];

let fullyConectedNetwork: Network= new Network();
fullyConectedNetwork.addLayer(new FullyConectedLayer(2,3));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(3,1));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));

fullyConectedNetwork.setLossFunction(NumTS.mse,NumTS.msePrime);

//fullyConectedNetwork.fit(x_train,y_train, 300,0.1);
/** 
let testclass: Network = new Network();

let test: Network = testclass.buildCustomNeuralNetwork(2, 3, new Array("TanH","TanH"), 
"Binary Cross Entropy", new Array(2, 3, 4));
test.fit(x_train, y_train, 300, 0.1);
*/
//let result : number[][][]= fullyConectedNetwork.predict(x_train);

//let result: number[][][] = test.predict(x_train);
let layer:FullyConectedLayer=new FullyConectedLayer(2,4);

let a:number[][]= [[1,3],[9,6]];
let b: number[][]=[[1,5],[6,4]];

let d: number= 2;

/** 
let a:number[][]= [[2]];
let b: number[][]=[[2],[3]];
let c: number[][]= [[1,2],[3,4]];
*/
let net: Network= new Network();
//let layer1: ActivationLayer = new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime);
let c: number[][] = [[1, 2]];
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