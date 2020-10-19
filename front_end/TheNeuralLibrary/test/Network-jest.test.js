"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Network_1 = require("../src/neuralNetwork/Network");
let net = new Network_1.Network();
net.buildCustomNeuralNetwork(2, 1, ["TanH"], "Mean Square Error", [3]);
describe("buildCustomNeuralNetwork test", () => {
    describe("when 2 and 1 and [TanH] and Mean Square Error and [3] is passed", () => {
        test("then result shold be fully NeuralNetwork with datazise 3 number of layers 1 act function TanH lossfunction MeanSquaredError neurons per layer 3", () => {
            const result = net.buildCustomNeuralNetwork(2, 1, ["TanH"], "Mean Square Error", [3]);
        });
    });
});
