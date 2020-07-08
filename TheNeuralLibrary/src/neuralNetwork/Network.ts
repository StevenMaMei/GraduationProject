import {NumTS} from "../math/NumTS"
import {ActivationLayer} from "./ActivationLayer"
import {FullyConectedLayer} from "./FullyConectedLayer"
import {Layer} from "./Layer"

class  Network{
    layers: Layer[];
    lossFunction: Function;
    lossFunctionPrime: Function;
    currEpoch: number;
    learningRate: number;
    x_train:number[][];
    y_train:number[][];
    constructor(){
        this.layers=[];
        this.lossFunction= NumTS.mse;
        this.lossFunctionPrime = NumTS.msePrime;
        this.currEpoch = 0;
        this.learningRate = 0.1;
        this.x_train = [];
        this.y_train = [];
    }

    addLayer(layer:Layer){
        this.layers.push(layer);
    }

    setLossFunction(lossFunc: Function, lossFuncPrime: Function){
        this.lossFunction= lossFunc;
        this.lossFunctionPrime = lossFuncPrime;
    }

    predict(inputData: number[][]):number[][][]{
        let result: number[][][]=[];
        
        for(let i = 0; i< inputData.length;i++){
            let output: number[][]=[inputData[i]];
            for(let j = 0; j< this.layers.length; j++){
                output = this.layers[j].forwardPropagation(output);
            }
            result.push(output);
        }
        return result;
    }
    fitTo(targetEpoch: number){
        for(; this.currEpoch < targetEpoch;++this.currEpoch){
            let error : number = 0;
            for(let j = 0; j < this.x_train.length; j++){
                let output: number[][]= [];
                output[0]= this.x_train[j];
                for(let k = 0; k < this.layers.length; k++){
                    output = this.layers[k].forwardPropagation(output);
                }
                let targetOutput:number[][]=[this.y_train[j]];
                error += this.lossFunction(output, targetOutput);

                let errorForBackwardProp: number[][] = this.lossFunctionPrime(output, targetOutput);
                for(let k = this.layers.length -1 ; k >= 0 ; k--){
                    errorForBackwardProp = this.layers[k].backPropagation(errorForBackwardProp, this.learningRate);
                }
            }
            
        }
    }
    goToNextEpoch(){
        let error : number = 0;
        for(let j = 0; j < this.x_train.length; j++){
            let output: number[][]= [];
            output[0]= this.x_train[j];
            for(let k = 0; k < this.layers.length; k++){
                output = this.layers[k].forwardPropagation(output);
            }
            let targetOutput:number[][]=[this.y_train[j]];
            error += this.lossFunction(output, targetOutput);

            let errorForBackwardProp: number[][] = this.lossFunctionPrime(output, targetOutput);
            for(let k = this.layers.length -1 ; k >= 0 ; k--){
                errorForBackwardProp = this.layers[k].backPropagation(errorForBackwardProp, this.learningRate);
            }
        }
        this.currEpoch++;
    }
    fit(x_train:number[][], y_train:number[][], epochs: number, learningRate: number){
        for(let i = 0; i < epochs; i++){
            let error : number = 0;
            for(let j = 0; j < x_train.length; j++){
                let output: number[][]= [];
                output[0]= x_train[j];
                for(let k = 0; k < this.layers.length; k++){
                    output = this.layers[k].forwardPropagation(output);
                }
                let targetOutput:number[][]=[y_train[j]];
                error += this.lossFunction(output, targetOutput);

                let errorForBackwardProp: number[][] = this.lossFunctionPrime(output, targetOutput);
                for(let k = this.layers.length -1 ; k >= 0 ; k--){
                    errorForBackwardProp = this.layers[k].backPropagation(errorForBackwardProp, learningRate);
                }
            }
            error /= x_train.length;
            console.log("Epoch " + i + " error = "+ error);
        }
    }

}
export{Network}
