import { ActivationLayer } from "../neuralNetwork/ActivationLayer"
import { FullyConectedLayer } from "../neuralNetwork/FullyConectedLayer"
import { Network } from "../neuralNetwork/Network"
import { NumTS } from "../math/NumTS";

let x_train: number[][] = [[0, 0], [0, 1], [1, 0], [1, 1]];
let y_train: number[][] = [[0], [1], [1], [0]];

let fullyConectedNetwork: Network = new Network();
/* fullyConectedNetwork.addLayer(new FullyConectedLayer(2,3));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(3,4));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(4,3));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime));
fullyConectedNetwork.addLayer(new FullyConectedLayer(3,1));
fullyConectedNetwork.addLayer(new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime)); */
fullyConectedNetwork.buildCustomNeuralNetwork(2, 1, ["TanH"], "Mean Square Error", [3])
fullyConectedNetwork.setLearningRate(0.1)
/* fullyConectedNetwork.setTrainingSet(x_train,y_train)
fullyConectedNetwork.setLossFunction(NumTS.mse,NumTS.msePrime); */


for (let index = 0; index < 1000; index++) {
    if (fullyConectedNetwork.direction == 1 && fullyConectedNetwork.current_layer % 2 == 0) {
        let n = fullyConectedNetwork.current_layer;
        console.log("--------------------------------------------------")
        console.log("---------Before step------")
        console.log(fullyConectedNetwork.layers[n]);
        fullyConectedNetwork.layerStep();
        console.log("---------After step------")
        console.log(fullyConectedNetwork.layers[n]);
        
    } else {
        fullyConectedNetwork.layerStep();
    }

}

let result: number[][][] = fullyConectedNetwork.predict(x_train);

console.log(result);


