"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numTS_1 = require("../../src/math/numTS");
let a = [[1, 2]];
let b = [[2], [3]];
describe("matrixDotProduct test", () => {
    describe("when [[1,2]] and [[2],[3]] are passed", () => {
        test("then result shold be [ [ 8 ] ] ", () => {
            const result = numTS_1.NumTS.matrixDotProduct(a, b);
            expect(result).toBe([[8]]);
        });
    });
});
a = [[1, 2], [3, 4]];
b = [[5], [6]];
describe("matrixDotProduct test", () => {
    describe("when [[1,2],[3,4]] and [[5],[6]] are passed", () => {
        test("then result shold be [[17],[39]] ", () => {
            const result = numTS_1.NumTS.matrixDotProduct(a, b);
            expect(result).toBe([[17], [39]]);
        });
    });
});
a = [[1, 2], [3, 4]];
b = [[5, 6], [7, 8]];
describe("matrixDotProduct test", () => {
    describe("when [[1,2],[3,4]] and [[5,6],[7,8]] are passed", () => {
        test("then result shold be [[19,22],[43,50]] ", () => {
            const result = numTS_1.NumTS.matrixDotProduct(a, b);
            expect(result).toBe([[19, 22], [43, 50]]);
        });
    });
});
describe("matrixSum test", () => {
    describe("when [[1,2],[3,4]] and [[5,6],[7,8]] are passed", () => {
        test("then result shold be [[6,8],[10,12]] ", () => {
            const result = numTS_1.NumTS.matrixSum(a, b);
            expect(result).toBe([[6, 8], [10, 12]]);
        });
    });
});
describe("matrixElemtWiseMult test", () => {
    describe("when [[1,2],[3,4]] and [[5,6],[7,8]] are passed", () => {
        test("then result shold be [[5,12],[21,32]] ", () => {
            const result = numTS_1.NumTS.matrixElemtWiseMult(a, b);
            expect(result).toBe([[5, 12], [21, 32]]);
        });
    });
});
b = [[5], [6]];
describe("matrixTransposse test", () => {
    describe("when [[1,2],[3,4]] ", () => {
        test("then result shold be [[1,3],[2,4]] ", () => {
            const result = numTS_1.NumTS.matrixTransposse(a);
            expect(result).toBe([[1, 3], [2, 4]]);
        });
    });
});
describe("matrixTransposse test", () => {
    describe("when [[5],[6]] ", () => {
        test("then result shold be [[5,6]] ", () => {
            const result = numTS_1.NumTS.matrixTransposse(b);
            expect(result).toBe([[5, 6]]);
        });
    });
});
b = [[5, 6]];
describe("matrixTransposse test", () => {
    describe("when [[5,6]] ", () => {
        test("then result shold be [[5],[6]] ", () => {
            const result = numTS_1.NumTS.matrixTransposse(b);
            expect(result).toBe([[5, 6]]);
        });
    });
});
b = [[6]];
describe("matrixTransposse test", () => {
    describe("when [[6]] ", () => {
        test("then result shold be [[6]] ", () => {
            const result = numTS_1.NumTS.matrixTransposse(b);
            expect(result).toBe([[6]]);
        });
    });
});
