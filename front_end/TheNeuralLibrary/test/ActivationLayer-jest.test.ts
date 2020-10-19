import {ActivationLayer} from "../src/neuralNetwork/ActivationLayer";
import {NumTS} from "../src/math/numTS";

let layer:ActivationLayer=new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime);
let a:number[][]=[[2]];

describe("forwardPropagation test",()=>{
    describe("when [[2]] is passed",()=>{
        test("then result shold be 0.9640275800758169 ",()=>{
            const result : number[][]=layer.forwardPropagation(a);
            expect(result).toStrictEqual([[0.9640275800758169]]);
        });
    });
});

describe("forwardPropagation test",()=>{
    describe("when [[2],[3]] is passed",()=>{
        test("then result shold be [[0.9640275800758169,0.9950547536867305]] ",()=>{
            a=[[2],[3]];
            const result : number[][]=layer.forwardPropagation(a);
            expect(result).toStrictEqual([[0.9640275800758169],[0.9950547536867305]]);
        });
    });
});

describe("forwardPropagation test",()=>{
    describe("when [[1,2],[3,4]] is passed",()=>{
        test("then result shold be [[0.7615941559557649,0.9640275800758169],[0.9950547536867305,0.999329299739067]] ",()=>{
            a=[[1,2],[3,4]];
            const result : number[][]=layer.forwardPropagation(a);
            expect(result).toStrictEqual([[0.7615941559557649,0.9640275800758169],[0.9950547536867305,0.999329299739067]]);
        });
    });
});
//TODO Test backPropagation