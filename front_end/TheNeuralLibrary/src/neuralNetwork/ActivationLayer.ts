import {NumTS} from "../math/NumTS"
import {Layer} from "./Layer"

class ActivationLayer implements Layer{
    input: number[][];
    output: number[][];
    activationFunction: Function;
    activationFunctionDerived: Function;
    constructor(activation:Function, activationPrime: Function){
        this.input=[];
        this.output=[];
        this.activationFunction=activation;
        this.activationFunctionDerived= activationPrime;
    }
    forwardPropagation(inputData: number[][]): number[][] {
        this.input= inputData;
        this.output=this.activationFunction(this.input);
        return this.output;
    }
    //needs to be tested
    backPropagation(errorRespectToOutput: number[][], learningRate: number): number[][] {
        console.log(learningRate)
        return NumTS.matrixElemtWiseMult(this.activationFunctionDerived(this.input),errorRespectToOutput);
    }


}

export{ActivationLayer};