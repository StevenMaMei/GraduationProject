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

fullyConectedNetwork.fit(x_train,y_train, 400,0.1);
/** 
let testclass: Network = new Network();

let test: Network = testclass.buildCustomNeuralNetwork(2, 3, new Array("TanH","TanH"), 
"Binary Cross Entropy", new Array(2, 3, 4));
test.fit(x_train, y_train, 300, 0.1);
*/
let result : number[][][]= fullyConectedNetwork.predict(x_train);

//let result: number[][][] = test.predict(x_train);
let layer:ActivationLayer=new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime);
let a:number[][]= [[1,2]];
let b: number[][]=[[10]];
let c: number[][]= [[2],[3]];
let d: number= 2;

console.log(NumTS.binary_cross_entropyPrime([[0.1,0.2,0.3]],[[0.15,0.23,0.26]]));

console.log("----RESULTS---"+"\n"+
NumTS.matrixLinearPrime(a)+"\n"+
NumTS.matrixLinearPrime(b)+"\n"+
NumTS.matrixLinearPrime(c)+"\n");
//console.log(result);