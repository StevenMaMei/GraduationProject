import {NumTS} from "../src/math/numTS";
let a:number[][]= [[1,2]];
let b: number[][]=[[2],[3]];
describe("matrixDotProduct test",()=>{
    describe("when [[1,2]] and [[2],[3]] are passed",()=>{
        test("then result shold be [ [ 8 ] ] ",()=>{
            const result : number[][]=NumTS.matrixDotProduct(a, b);
            expect(result).toBe([ [ 8 ] ]);
        });
    });
});

a = [[1,2],[3,4]];
b= [[5],[6]];



 