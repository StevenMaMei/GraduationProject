import {ActivationLayer} from "../neuralNetwork/ActivationLayer"
import {FullyConectedLayer} from "../neuralNetwork/FullyConectedLayer"
import {Network} from "../neuralNetwork/Network"
import { networkInterfaces } from "os";
import { NumTS } from "../math/NumTS";

let x_train: number[][]=[[0,0], [0,1], [1,0], [1,1]];
let y_train: number[][]=[[0], [1], [1], [0]];
/** 
let fullyConectedNetwork: Network= new Network();
fullyConectedNetwork.addLayer(new FullyConectedLayer(2,3));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(3,1));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));

fullyConectedNetwork.setLossFunction(NumTS.binary_cross_entropy,NumTS.binary_cross_entropyPrime);

fullyConectedNetwork.fit(x_train,y_train, 300,0.1);
*/
let testclass: Network= new Network();

let test: Network= testclass.buildCustomNeuralNetwork(2,3,new Array(NumTS.matrixTanh,NumTS.matrixTanh),new Array(NumTS.matrixTanhPrime,NumTS.matrixTanhPrime),NumTS.binary_cross_entropy,NumTS.binary_cross_entropyPrime,new Array(2,3,4));
test.fit(x_train,y_train, 300,0.1);

//let result : number[][][]= fullyConectedNetwork.predict(x_train);

let result : number[][][]= test.predict(x_train);

console.log(result);