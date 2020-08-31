import {NumTS} from "../NumTS";
let a:number[][]= [[1,2]];
let b: number[][]=[[2],[3]];

console.log(NumTS.matrixDotProduct(a,b));

a = [[1,2],[3,4]];
b= [[5],[6]];

console.log(NumTS.matrixDotProduct(a,b));

a = [[1,2],[3,4]];
b= [[5,6],[7,8]];

console.log(NumTS.matrixDotProduct(a,b));

console.log(NumTS.matrixSum(a,b));

console.log(NumTS.matrixElemtWiseMult(a,b));

b= [[5],[6]];
console.log("transpose-------------");
console.log(NumTS.matrixTransposse(a));
console.log(NumTS.matrixTransposse(b));
b= [[5,6]];
console.log(NumTS.matrixTransposse(b));
b= [[6]];
console.log(NumTS.matrixTransposse(b));