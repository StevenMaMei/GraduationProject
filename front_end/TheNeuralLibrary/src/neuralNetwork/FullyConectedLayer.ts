import {Layer} from "./Layer"
import {NumTS} from "../math/NumTS"
class FullyConectedLayer implements Layer{
    weights: number[][];
    bias: number[][];
    input:number[][];
    output:number[][];
    constructor(inputSize: number, outputSize: number){
        this.weights=[];
        this.bias=[];
        this.input=[];
        this.output=[];
        for(let i =0; i<inputSize;i++){
            this.weights[i]=[];
            for(let j=0;j<outputSize;j++){
                this.weights[i][j] =Math.random();
            }
        }
        this.bias[0]=[];
        for(let i= 0; i<outputSize; i++){
            this.bias[0][i]= Math.random();
        }
    }
    forwardPropagation(inputData: number[][]): number[][] {
        this.input = inputData;
        this.output = NumTS.matrixDotProduct(this.input,this.weights);
        this.output = NumTS.matrixSum(this.output, this.bias);
        return this.output;
    }
    backPropagation(errorRespectToOutput: number[][], learningRate: number): number[][] {
        let errorRespectToInput : number[][] =  NumTS.matrixDotProduct( errorRespectToOutput, NumTS.matrixTransposse(this.weights));
        let errorRespectWeights: number[][]= NumTS.matrixDotProduct(NumTS.matrixTransposse(this.input), errorRespectToOutput);

        errorRespectWeights = NumTS.matrixMultWithSingleValue(errorRespectWeights,-learningRate);
        this.weights = NumTS.matrixSum(this.weights, errorRespectWeights);

        this.bias = NumTS.matrixSum(this.bias, NumTS.matrixMultWithSingleValue(errorRespectToOutput,-learningRate));

        return errorRespectToInput;
    }
    

}

export{FullyConectedLayer};