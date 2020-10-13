"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Network_1 = require("../neuralNetwork/Network");
let x_train = [[0, 0], [0, 1], [1, 0], [1, 1]];
let y_train = [[0], [1], [1], [0]];
let fullyConectedNetwork = new Network_1.Network();
/* fullyConectedNetwork.addLayer(new FullyConectedLayer(2,3));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(3,4));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(4,3));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(3,1));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime)); */
fullyConectedNetwork.buildCustomNeuralNetwork(2, 1, ["TanH"], "Mean Square Error", [3]);
fullyConectedNetwork.setLearningRate(0.1);
/* fullyConectedNetwork.setTrainingSet(x_train,y_train)
fullyConectedNetwork.setLossFunction(NumTS.mse,NumTS.msePrime); */
for (let index = 0; index < 100000; index++) {
    fullyConectedNetwork.layerStep();
}
let result = fullyConectedNetwork.predict(x_train);
console.log(result);
