"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActivationLayer_1 = require("../src/neuralNetwork/ActivationLayer");
const numTS_1 = require("../src/math/numTS");
let layer = new ActivationLayer_1.ActivationLayer(numTS_1.NumTS.matrixTanh, numTS_1.NumTS.matrixTanhPrime);
let a = [[2]];
describe("forwardPropagation test", () => {
    describe("when [[2]] is passed", () => {
        test("then result shold be 0.9640275800758169 ", () => {
            const result = layer.forwardPropagation(a);
            expect(result).toStrictEqual([[0.9640275800758169]]);
        });
    });
});
describe("forwardPropagation test", () => {
    describe("when [[2],[3]] is passed", () => {
        test("then result shold be [[0.9640275800758169,0.9950547536867305]] ", () => {
            a = [[2], [3]];
            const result = layer.forwardPropagation(a);
            expect(result).toStrictEqual([[0.9640275800758169], [0.9950547536867305]]);
        });
    });
});
describe("forwardPropagation test", () => {
    describe("when [[1,2],[3,4]] is passed", () => {
        test("then result shold be [[0.7615941559557649,0.9640275800758169],[0.9950547536867305,0.999329299739067]] ", () => {
            a = [[1, 2], [3, 4]];
            const result = layer.forwardPropagation(a);
            expect(result).toStrictEqual([[0.7615941559557649, 0.9640275800758169], [0.9950547536867305, 0.999329299739067]]);
        });
    });
});
//TODO Test backPropagation
