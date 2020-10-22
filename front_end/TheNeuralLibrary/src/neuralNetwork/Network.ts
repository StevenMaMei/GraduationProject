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
    all_outputs: number[][][];
    output_size: number;
    current_layer: number;
    current_error: number;
    current_datapoint_index: number; // the position, in the x_train array, of the current data point that is being passed through the network
    current_outputs: number[][][]; //outputs for every sample on x_train
    current_output: number[][]; // output for a specific sample on x_train
    current_backProp_errors: number[][][]; //outputs for every sample on x_train
    current_backProp_error: number[][]; // output for a specific sample on x_train
    direction: number; // 0 is forward propagation, 1 is backwards propagation
    dataSize: number; 
    layersN: number; 
    actFunc: Array<String>; 
    lossFunc: String; 
    neuronPerLayer: Array<number>;

    lossFunctionsMap: Map<String, Function> = new Map([
        ["Binary Cross Entropy", NumTS.binary_cross_entropyPrime],
        ["Mean Square Error", NumTS.msePrime]

    ])

    activationFunctionsMap: Map<String, Function> = new Map([
        ["TanH", NumTS.matrixTanhPrime],

    ])

    //constants
    maxNumberOfNeurons: number = 4;
    maxNumberOfLayers: number = 3;

    // it cant never return a null value since the universe of keys is always limited to available ones
    getActivationFunctionDerivative(key: String): Function {

        return this.activationFunctionsMap.get(key)!;

    }

    // it cant never return a null value since the universe of keys is always limited to available ones
    getLossFunctionDerivative(key: String): Function {

        return this.lossFunctionsMap.get(key)!;

    }


    getAllActivationFunctions(): Array<String> {
        let result: Array<String> = new Array<String>();

        for (let key of this.activationFunctionsMap.keys()) {
            result.push(key);
        }
        return result;
    }

    getAllLossFunctions(): Array<String> {
        let result: Array<String> = new Array<String>();

        for (let key of this.lossFunctionsMap.keys()) {
            result.push(key);
        }
        return result;
    }

    getMaxNumberOfNeurons(): number {

        return this.maxNumberOfNeurons;
    }

    getMaxNumberOfLayers(): number {

        return this.maxNumberOfLayers;

    }

    getLayers() {
        return this.layers;
    }



    constructor() {
        this.all_outputs = [];
        this.layers = [];
        this.lossFunction = NumTS.mse;
        this.lossFunctionPrime = NumTS.msePrime;
        this.currEpoch = 0;
        this.learningRate = 0.1;
        this.x_train = [];
        this.y_train = [];
        this.current_datapoint_index = 0;
        this.current_layer = 0;
        this.direction = 0;
        this.current_error = 0;
        this.current_outputs = [];
        this.current_output = [];
        this.current_backProp_errors = [];
        this.current_backProp_error = [];
        this.output_size = 1;
        this.dataSize = 0; 
        this.layersN= 0; 
        this.actFunc= []; 
        this.lossFunc= ""; 
        this.neuronPerLayer= [];
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

            this.current_output = this.current_outputs[this.current_datapoint_index];

            this.current_output = this.layers[this.current_layer].forwardPropagation(this.current_output); // does the forward propagation for the sample "j" in x_train
            this.current_outputs[this.current_datapoint_index] = this.current_output; // assigns the new values
            this.all_outputs.push(this.current_output);


            if (this.current_layer == this.layers.length - 1) { // in case forward its over, then it calculates the error in order to start backwards propagation in the next step
                let targetOutput: number[][] = [this.y_train[this.current_datapoint_index]]; // calculates the error comparing to the true expected value "j" in y_train
                this.current_error += this.lossFunction(this.current_output, targetOutput);
                let errorForBackwardProp: number[][] = this.lossFunctionPrime(this.current_output, targetOutput);
                this.current_backProp_errors[this.current_datapoint_index] = errorForBackwardProp;
            }


            if (this.current_layer == this.layers.length - 1) { // in case the forward prop is over, it changes the direction of the propagation to backwards propagation
                this.direction = 1;
            } else {
                this.current_layer++; // advances one layer
            }

        } else if (this.direction == 1) { //backwards propagation

            this.current_backProp_error = this.current_backProp_errors[this.current_datapoint_index];
            this.current_backProp_errors[this.current_datapoint_index] = this.layers[this.current_layer].backPropagation(this.current_backProp_error, this.learningRate); // does the backwards propagation for the sample "j" in current_backProp_errors




            if (this.current_layer == 0) {
                this.direction = 0;
                this.current_datapoint_index++;
                this.all_outputs = []; //resets the array of outputs that is shown in the visualization

                // -- resets the values for the next epoch
                if (this.current_datapoint_index == this.x_train.length) {
                    this.currEpoch++;
                    this.current_error /= this.x_train.length;
                    console.log("Epoch " + this.currEpoch + " error = " + this.current_error);
                    this.current_outputs = [];
                    this.current_output = [];
                    this.current_backProp_errors = [];
                    this.current_backProp_error = [];
                    this.current_error = 0;
                    this.current_datapoint_index = 0;
                }
                // --

            }

            if (this.current_layer > 0) {
                this.current_layer--;
            }
        }
    }

    //might not work, please check if there is a problem with the switch
    selectFunction(F: String): Function {
        let result = new Function;

        switch (F) {
            case "Mean Square Error": {
                result = NumTS.mse;
                break;
            }
            case "Binary Cross Entropy": {
                result = NumTS.binary_cross_entropy;
                break;
            }
            case "TanH": {
                result = NumTS.matrixTanh;
                break;
            }

        }
        return result;


    }




    buildCustomNeuralNetwork(xDataPoints:number[][], yDataPoints:number[][], outputS:number, dataSize: number, layersN: number, actFunc: Array<String>, lossFunc: String, neuronPerLayer: Array<number>): Network {

        //we store this info, to later save the network config
        this.dataSize = dataSize;
        this.layersN = layersN;
        this.actFunc = actFunc;
        this.lossFunc = lossFunc;
        this.neuronPerLayer = neuronPerLayer;
        //-------
        this.x_train = xDataPoints;
        this.y_train = yDataPoints;
        this.output_size= outputS;
        this.layers = [];

        if (layersN == 1) {
            this.addLayer(new FullyConectedLayer(dataSize, neuronPerLayer[0]));
            this.addLayer(new ActivationLayer(this.selectFunction(actFunc[0]), this.getActivationFunctionDerivative(actFunc[0])));
            this.addLayer(new FullyConectedLayer(neuronPerLayer[0], neuronPerLayer[0]));
            this.addLayer(new ActivationLayer(this.selectFunction(actFunc[0]), this.getActivationFunctionDerivative(actFunc[0])));
            this.addLayer(new FullyConectedLayer(neuronPerLayer[0], this.output_size));
            this.addLayer(new ActivationLayer(this.selectFunction(actFunc[0]), this.getActivationFunctionDerivative(actFunc[0])));
        } else {
            for (var i = 0; i < layersN; i++) {

                if (i == 0) {

                    this.addLayer(new FullyConectedLayer(dataSize, neuronPerLayer[i]));
                    this.addLayer(new ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));


                    this.addLayer(new FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
                    this.addLayer(new ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));


                } else if (i == layersN - 1) {


                    this.addLayer(new FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i]));
                    this.addLayer(new ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));

                    console.log(this.output_size+" --- output size")
                    this.addLayer(new FullyConectedLayer(neuronPerLayer[i], this.output_size));
                    this.addLayer(new ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));

                } else {

                    this.addLayer(new FullyConectedLayer(neuronPerLayer[i], neuronPerLayer[i + 1]));
                    this.addLayer(new ActivationLayer(this.selectFunction(actFunc[i]), this.getActivationFunctionDerivative(actFunc[i])));
                }
            }
        }

        this.setLossFunction(this.selectFunction(lossFunc), this.getLossFunctionDerivative(lossFunc));

        return this;

    }

    addLayer(layer: Layer) {
        this.layers.push(layer);
    }

    setLearningRate(lr: number) {
        this.learningRate = lr;
    }

    setLossFunction(lossFunc: Function, lossFuncPrime: Function) {
        this.lossFunction = lossFunc;
        this.lossFunctionPrime = lossFuncPrime;
    }

    setTrainingSet(x: number[][], y: number[][]) {
        this.x_train = x;
        this.y_train = y;
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
            console.log(error)
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
        console.log(error)
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
