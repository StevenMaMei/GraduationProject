import { NumTS } from "../math/NumTS"
import { ActivationLayer } from "./ActivationLayer"
import { FullyConectedLayer } from "./FullyConectedLayer"
import { Layer } from "./Layer"

class Network {
    layers: Layer[];
    lossFunction: Function;
    lossFunctionPrime: Function;
    currEpoch: number;
    learningRate: number;
    x_train: number[][];
    y_train: number[][];
    current_layer: number;
    current_error: number;
    current_outputs: number[][][]; //outputs for every sample on x_train
    current_output: number[][]; // output for a specific sample on x_train
    current_backProp_errors: number[][][]; //outputs for every sample on x_train
    current_backProp_error: number[][]; // output for a specific sample on x_train
    direction: number; // 0 is forward propagation, 1 is backwards propagation
    constructor() {
        this.layers = [];
        this.lossFunction = NumTS.mse;
        this.lossFunctionPrime = NumTS.msePrime;
        this.currEpoch = 0;
        this.learningRate = 0.1;
        this.x_train = [];
        this.y_train = [];
        this.current_layer = 0;
        this.direction = 0;
        this.current_error = 0;
        this.current_outputs = [];
        this.current_output = [];
        this.current_backProp_errors = [];
        this.current_backProp_error = []
    }


    


    layerStep() { // this method is in charge of doing a single step on a layer, taking into consideration if its a forward propagation step or a backwards propagation step

        if (this.current_outputs.length == 0) { // initializes the first output for every sample in x_train
            for (let j = 0; j < this.x_train.length; j++) {
                let curr: number[][] = [];
                curr[0] = this.x_train[j];
                this.current_outputs[j] = curr;
            }
        }

        if (this.direction == 0) { //forward propagation

            for (let j = 0; j < this.current_outputs.length; j++) {

                this.current_output = this.current_outputs[j];

                this.current_output = this.layers[this.current_layer].forwardPropagation(this.current_output); // does the forward propagation for the sample "j" in x_train
                this.current_outputs[j] = this.current_output; // assigns the new values

                if (this.current_layer == this.layers.length - 2) { // in case forward its over, then it calculates the error in order to start backwards propagation in the next step
                    let targetOutput: number[][] = [this.y_train[j]]; // calcuales the error comparing to the true expected value "j" in y_train
                    this.current_error += this.lossFunction(this.current_output, targetOutput);
                    let errorForBackwardProp: number[][] = this.lossFunctionPrime(this.current_output, targetOutput);
                    this.current_backProp_errors[j] = errorForBackwardProp;
                }

            }
            this.current_layer++; // advances one layer
            if (this.current_layer == this.layers.length - 1) { // in case the forward prop is over, it changes the direction of the propagation to backwards propagation
                this.direction = 1;
            }

        } else if (this.direction == 1) { //backwards propagation

            for (let j = 0; j < this.current_backProp_errors.length; j++) { 
                this.current_backProp_error = this.current_backProp_errors[j];
                this.current_backProp_errors[j] = this.layers[this.current_layer].backPropagation(this.current_backProp_error, this.learningRate); // does the backwards propagation for the sample "j" in current_backProp_errors
            }

            this.current_layer = this.current_layer - 1;
            if (this.current_layer == 0) {
                this.direction = 0;
                this.currEpoch ++;
                this.current_error /= this.x_train.length;
                console.log("Epoch " + this.currEpoch + " error = " + this.current_error);

                // -- resets the values for the next epoch

                this.current_outputs = [];
                this.current_output = [];
                this.current_backProp_errors = [];
                this.current_backProp_error = [];
                this.current_error = 0;

                // --
            }
        }
    }

    buildCustomNeuralNetwork(dataSize: number, layers: number, actFunc: Function, actFuncPrime: Function, lossFunc: Function, lossFuncPrime: Function, neuronPerLayer: Array<number>): Network {

        let net: Network = new Network();



        for (var i = 0; i < layers; i++) {

            if (i == 0) {
                net.addLayer(new FullyConectedLayer(dataSize, neuronPerLayer[i + 1]));
                net.addLayer(new ActivationLayer(actFunc, actFuncPrime));

            } else if (i == layers - 1) {
                net.addLayer(new FullyConectedLayer(neuronPerLayer[i], 1));
                net.addLayer(new ActivationLayer(actFunc, actFuncPrime));

            }

            net.addLayer(new FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
            net.addLayer(new ActivationLayer(actFunc, actFuncPrime));

        }
        net.setLossFunction(lossFunc, lossFuncPrime);

        return net;

    }

    addLayer(layer: Layer) {
        this.layers.push(layer);
    }

    setLossFunction(lossFunc: Function, lossFuncPrime: Function) {
        this.lossFunction = lossFunc;
        this.lossFunctionPrime = lossFuncPrime;
    }

    predict(inputData: number[][]): number[][][] {
        let result: number[][][] = [];

        for (let i = 0; i < inputData.length; i++) {
            let output: number[][] = [inputData[i]];
            for (let j = 0; j < this.layers.length; j++) {
                output = this.layers[j].forwardPropagation(output);
            }
            result.push(output);
        }
        return result;
    }
    fitTo(targetEpoch: number) {
        for (; this.currEpoch < targetEpoch; ++this.currEpoch) {
            let error: number = 0;
            for (let j = 0; j < this.x_train.length; j++) {
                let output: number[][] = [];
                output[0] = this.x_train[j];
                for (let k = 0; k < this.layers.length; k++) {
                    output = this.layers[k].forwardPropagation(output);
                }
                let targetOutput: number[][] = [this.y_train[j]];
                error += this.lossFunction(output, targetOutput);

                let errorForBackwardProp: number[][] = this.lossFunctionPrime(output, targetOutput);
                for (let k = this.layers.length - 1; k >= 0; k--) {
                    errorForBackwardProp = this.layers[k].backPropagation(errorForBackwardProp, this.learningRate);
                }
            }

        }
    }
    goToNextEpoch() {
        let error: number = 0;
        for (let j = 0; j < this.x_train.length; j++) {
            let output: number[][] = [];
            output[0] = this.x_train[j];
            for (let k = 0; k < this.layers.length; k++) {
                output = this.layers[k].forwardPropagation(output);
            }
            let targetOutput: number[][] = [this.y_train[j]];
            error += this.lossFunction(output, targetOutput);

            let errorForBackwardProp: number[][] = this.lossFunctionPrime(output, targetOutput);
            for (let k = this.layers.length - 1; k >= 0; k--) {
                errorForBackwardProp = this.layers[k].backPropagation(errorForBackwardProp, this.learningRate);
            }
        }
        this.currEpoch++;
    }
    fit(x_train: number[][], y_train: number[][], epochs: number, learningRate: number) {
        for (let i = 0; i < epochs; i++) {
            let error: number = 0;
            for (let j = 0; j < x_train.length; j++) {
                let output: number[][] = [];
                output[0] = x_train[j];
                for (let k = 0; k < this.layers.length; k++) {
                    output = this.layers[k].forwardPropagation(output);
                }
                let targetOutput: number[][] = [y_train[j]];
                error += this.lossFunction(output, targetOutput);

                let errorForBackwardProp: number[][] = this.lossFunctionPrime(output, targetOutput);
                for (let k = this.layers.length - 1; k >= 0; k--) {
                    errorForBackwardProp = this.layers[k].backPropagation(errorForBackwardProp, learningRate);
                }
            }
            error /= x_train.length;
            console.log("Epoch " + i + " error = " + error);
        }
    }



}
export { Network }
