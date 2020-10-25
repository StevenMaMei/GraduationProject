import { FullyConectedLayer } from "../src/neuralNetwork/FullyConectedLayer";

let weights:number[][]= [[0.1,0.3,0.4,0.9],
                         [0.9,0.6,0.7,0.5]];
let biases:number[][]=[[0.1,0.9,0.4,0.6]];


describe("forwardPropagation test", () => {
    describe("when [[2]] is passed", () => {
        test("then result shold be [[0.30000000000000004,1.5,1.2000000000000002,2.4]]", () => {
            let weights1:number[][]= [[0.1,0.3,0.4,0.9]];
            let layer: FullyConectedLayer = new FullyConectedLayer(1,4);
            layer.bias=biases;
            layer.weights=weights1;
            const result: number[][] = layer.forwardPropagation([[2]]);
            
            expect(result).toStrictEqual([[0.30000000000000004,1.5,1.2000000000000002,2.4]]);
        });
    });
});

describe("forwardPropagation test", () => {
    describe("when [[2, 3]] is passed", () => {
        test("then result shold be [[3.0000000000000004,3.3,3.2999999999999994, 3.9]] ", () => {
            let layer: FullyConectedLayer = new FullyConectedLayer(2,4);
            layer.bias=biases;
            layer.weights=weights;
            const result: number[][] = layer.forwardPropagation([[2, 3]]);
            expect(result).toStrictEqual([[3.0000000000000004,3.3,3.2999999999999994, 3.9]]);
        });
    });
});

describe("forwardPropagation test", () => {
    describe("when [[1, 2]] is passed", () => {
        test("then result shold be [[2,2.4,2.1999999999999997,2.5]] ", () => {
            let layer: FullyConectedLayer = new FullyConectedLayer(2,4);
            layer.bias=biases;
            layer.weights=weights;
            const result: number[][] = layer.forwardPropagation([[1, 2]]);
            expect(result).toStrictEqual([[  2,2.4,2.1999999999999997,2.5]]);
        });
    });
});



describe("backPropagation test", () => {
    describe("when ActivationLayer(NumTS.matrixTanh, NumTS.matrixTanhPrime) and [[0.1,0.5,0.3,0.7]] and 0.02 are passed", () => {
        test("then result shold be [[0.91, 0.95,]] ", () => {
            let layer1: FullyConectedLayer = new FullyConectedLayer(2,4);
            layer1.bias=biases;
            layer1.weights=weights;
            let c: number[][] = [[1, 2]];

            layer1.forwardPropagation(c);

            const result: number[][] = layer1.backPropagation([[0.1,0.5,0.3,0.7]],0.02);
            expect(result).toStrictEqual([[0.91, 0.95,]]);
        });
    });
});
