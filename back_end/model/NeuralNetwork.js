const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let neuralNetworkSchema = new Schema({
    ownerEmail: {
        type: String,
        unique: true,
        required: [true, "Email required"],
    },
    dataSize: {
        type: Number,
        required: [true, "dataSize required"],
    },
    numOfLayers: {
        type: Number,
        required: [true, "numOfLayers required"],
    },
    activationFunctions: {
        type: Array,
        required: [true, "dataSize required"],
    },
    lossFunction: {
        type: String,
        required: [true, "dataSize required"],
    },
    neuronsPerLayer: {
        type: Array,
        required: [true, "dataSize required"],
    }
});

neuralNetworkSchema.methods.toJSON = function() {
    let network = this;
    let networkObject = network.toObject();
    return networkObject;
 }

neuralNetworkSchema.plugin(uniqueValidator);

module.exports = mongoose.model('NeuralNetwork', neuralNetworkSchema)
