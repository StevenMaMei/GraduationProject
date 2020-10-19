import { ActivationLayer } from "../src/neuralNetwork/ActivationLayer";
import { NumTS } from "../src/math/numTS";

let layer: ActivationLayer = new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime);


describe("forwardPropagation test", () => {
    describe("when [[2]] is passed", () => {
        test("then result shold be 0.9640275800758169 ", () => {
            const result: number[][] = layer.forwardPropagation([[2]]);
            expect(result).toStrictEqual([[0.9640275800758169]]);
        });
    });
});

describe("forwardPropagation test", () => {
    describe("when [[2],[3]] is passed", () => {
        test("then result shold be [[0.9640275800758169,0.9950547536867305]] ", () => {

            const result: number[][] = layer.forwardPropagation([[2], [3]]);
            expect(result).toStrictEqual([[0.9640275800758169], [0.9950547536867305]]);
        });
    });
});

describe("forwardPropagation test", () => {
    describe("when [[1,2],[3,4]] is passed", () => {
        test("then result shold be [[0.7615941559557649,0.9640275800758169],[0.9950547536867305,0.999329299739067]] ", () => {

            const result: number[][] = layer.forwardPropagation([[1, 2], [3, 4]]);
            expect(result).toStrictEqual([[0.7615941559557649, 0.9640275800758169], [0.9950547536867305, 0.999329299739067]]);
        });
    });
});



describe("backPropagation test", () => {
    describe("when ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime) and [[1, 3], [9, 6]] and [[1, 5], [6, 4]] and [[1, 2], [3, 4]] is passed", () => {
        test("then result shold be [[0.41997434161402614],[0.029598111496320634],[5.482792539979187e-7],[0.00014745928443171685]] ", () => {
            let layer1: ActivationLayer = new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime);
            let a: number[][] = [[1, 3], [9, 6]];
            let b: number[][] = [[1, 5], [6, 4]];
            let c: number[][] = [[1, 2], [3, 4]];

            layer1.forwardPropagation(c);
            layer1.forwardPropagation(b);
            layer1.forwardPropagation(a);


            const result: number[][] = layer1.backPropagation(a);
            expect(result).toStrictEqual([[0.41997434161402614],[0.029598111496320634],[5.482792539979187e-7],[0.00014745928443171685]]);
        });
    });
});


//TODO Test backPropagation