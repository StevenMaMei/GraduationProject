const NeuralNetwork = require('../model/NeuralNetwork')
const User = require('../model/user');

class NeuralNetworkService{
    async saveNeuralNetwork(neuralNetwork, res){
        let {ownerEmail} = neuralNetwork;
        User.findOne({email : ownerEmail}, (erro, foundUser) => {
            if (erro) {
                return res.status(500).json({
                    ok: false,
                    err: erro
                })
            }
            if (!foundUser) {
                return res.status(400).json({
                ok: false,
                err: {
                    message: "Incorrect user"
                }
                })
            }
            let neuralNetworkToSave = new NeuralNetwork(neuralNetwork);
            neuralNetworkToSave.save((err, neuralNet) => {
                if (err) {
                    return res.status(400).json({
                       ok: false,
                       err,
                    });
                }
                res.json({
                    ok: true,
                    neuralNet: neuralNet
                 });
            })
        })
    }
}

module.exports = {
    NeuralNetworkService
}