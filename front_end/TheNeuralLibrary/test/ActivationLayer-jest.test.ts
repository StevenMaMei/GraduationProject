import { ActivationLayer } from "../src/neuralNetwork/ActivationLayer";
import { NumTS } from "../src/math/numTS";



describe("forwardPropagation test", () => {
    describe("when [[2]] is passed", () => {
        test("then result shold be 0.9640275800758169 ", () => {
            let layer: ActivationLayer = new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime);

            const result: number[][] = layer.forwardPropagation([[2]]);
            expect(result).toStrictEqual([[0.9640275800758169]]);
        });
    });
});

describe("forwardPropagation test", () => {
    describe("when [[2],[3]] is passed", () => {
        test("then result shold be [[0.9640275800758169,0.9950547536867305]] ", () => {
            let layer: ActivationLayer = new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime);

            const result: number[][] = layer.forwardPropagation([[2], [3]]);
            expect(result).toStrictEqual([[0.9640275800758169], [0.9950547536867305]]);
        });
    });
});

describe("forwardPropagation test", () => {
    describe("when [[1,2],[3,4]] is passed", () => {
        test("then result shold be [[0.7615941559557649,0.9640275800758169],[0.9950547536867305,0.999329299739067]] ", () => {
            let layer: ActivationLayer = new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime);

            const result: number[][] = layer.forwardPropagation([[1, 2], [3, 4]]);
            expect(result).toStrictEqual([[0.7615941559557649, 0.9640275800758169], [0.9950547536867305, 0.999329299739067]]);
        });
    });
});



describe("backPropagation test", () => {
    describe("when ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime) and [[1, 3], [9, 6]] and [[1, 5], [6, 4]] and [[1, 2], [3, 4]] is passed", () => {
        test("then result shold be [[ 0.41997434161402614, 0.35325412426582214 ],[ 0.05919622299264127, 0.005363802732103462 ]]", () => {
            let layer1: ActivationLayer = new ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime);

            let c: number[][] = [[1, 2], [3, 4]];

            layer1.forwardPropagation(c);

            const result: number[][] = layer1.backPropagation([[1, 5], [6, 4]]);
            expect(result).toStrictEqual([
                [0.41997434161402614, 0.35325412426582214],
                [0.05919622299264127, 0.005363802732103462]
            ]);
        });
    });
});


//TODO Test backPropagation