import {numTS} from "../numTS";
let a:number[][]= [[1,2]];
let b: number[][]=[[2],[3]];

console.log(numTS.matrixDotProduct(a,b));

a = [[1,2],[3,4]];
b= [[5],[6]];

console.log(numTS.matrixDotProduct(a,b));

a = [[1,2],[3,4]];
b= [[5,6],[7,8]];

console.log(numTS.matrixDotProduct(a,b));

console.log(numTS.matrixSum(a,b));

console.log(numTS.matrixElemtWiseMult(a,b));

b= [[5],[6]];
console.log("transpose-------------");
console.log(numTS.matrixTransposse(a));
console.log(numTS.matrixTransposse(b));
b= [[5,6]];
console.log(numTS.matrixTransposse(b));
b= [[6]];
console.log(numTS.matrixTransposse(b));