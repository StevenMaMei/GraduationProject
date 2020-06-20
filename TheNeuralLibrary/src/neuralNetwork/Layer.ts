
interface Layer{
    input: number[][];
    output: number[][];

    forwardPropagation(inputData:number[][]):number[][];

    backPropagation(errorRespectToOutput: number[][], learningRate: number):number[][];
}

export{Layer};