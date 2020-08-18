import {ActivationLayer} from "../neuralNetwork/ActivationLayer"
import {FullyConectedLayer} from "../neuralNetwork/FullyConectedLayer"
import {Network} from "../neuralNetwork/Network"
import { networkInterfaces } from "os";
import { NumTS } from "../math/NumTS";

let x_train: number[][]=[[0,0], [0,1], [1,0], [1,1]];
let y_train: number[][]=[[0], [1], [1], [0]];

let fullyConectedNetwork: Network= new Network();
fullyConectedNetwork.addLayer(new FullyConectedLayer(2,3));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(3,1));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.setLearningRate(0.01)
fullyConectedNetwork.setTrainingSet(x_train,y_train)
fullyConectedNetwork.setLossFunction(NumTS.binary_cross_entropy,NumTS.binary_cross_entropyPrime);

for (let index = 0; index < 300; index++) {
    fullyConectedNetwork.layerStep();
}

let result : number[][][]= fullyConectedNetwork.predict(x_train);

console.log(result);

