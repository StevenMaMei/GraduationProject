import { Network } from "../src/neuralNetwork/Network";
import { readFileSync } from 'fs';



let net: Network= new Network();

net.buildCustomNeuralNetwork(2,1,["TanH"],"Mean Square Error",[3]);


describe("buildCustomNeuralNetwork test", () => {
    describe("when 2 and 1 and [TanH] and Mean Square Error and [3] is passed", () => {
        test("then result shold be fully NeuralNetwork with datazise 3 number of layers 1 act function TanH lossfunction MeanSquaredError neurons per layer 3", () => {
            
            const result: Network = net.buildCustomNeuralNetwork(2,1,["TanH"],"Mean Square Error",[3]);
             expect(result.layers.length).toBe(6);
        });
    });
});
