const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let neuralNetworkSchema = new Schema({
    ownerEmail: {
        type: String,
        required: [true, "Email required"],
    },
    networkName: {
        type: String,
        required: [true, "Name of the network required"],
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
    },
    xTrain: {
        type: Array,
        required: [true, "data x_train is required"],
    },
    yTrain: {
        type: Array,
        required: [true, "data y_train is required"],
    },
    outputSize: {
        type: Number,
        required: [true, "output size is required"],
    }
});
neuralNetworkSchema.index({ownerEmail: 1 ,networkName:1 }, {unique: true});
neuralNetworkSchema.set('autoIndex', false);
neuralNetworkSchema.methods.toJSON = function() {
    let network = this;
    let networkObject = network.toObject();
    return networkObject;
 }

neuralNetworkSchema.plugin(uniqueValidator);

module.exports = mongoose.model('NeuralNetwork', neuralNetworkSchema)
