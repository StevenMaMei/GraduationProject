import {NumTS} from "../math/NumTS"
import {ActivationLayer} from "../neuralNetwork/ActivationLayer"
import {FullyConectedLayer} from "../neuralNetwork/FullyConectedLayer"
import {Network} from "../neuralNetwork/Network"
import { networkInterfaces } from "os";

let x_train: number[][]=[[0,0], [0,1], [1,0], [1,1]];
let y_train: number[][]=[[0], [1], [1], [0]];

let fullyConectedNetwork: Network= new Network();
fullyConectedNetwork.addLayer(new FullyConectedLayer(2,3));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(3,1));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));

fullyConectedNetwork.setLossFunction(NumTS.mse,NumTS.msePrime);

fullyConectedNetwork.fit(x_train,y_train, 300,0.1);

let result : number[][][]= fullyConectedNetwork.predict(x_train);

console.log(result);