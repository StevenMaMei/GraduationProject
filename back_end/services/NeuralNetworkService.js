const NeuralNetwork = require('../model/NeuralNetwork');
const user = require('../model/user');
const User = require('../model/user');

class NeuralNetworkService{
    async saveNeuralNetwork(neuralNetwork, tokenInfo, res){
        let {ownerEmail} = neuralNetwork;
        
        if(ownerEmail !== tokenInfo.usuario.email){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "You are not the user in which you want to save the network"
                }
                })
        }
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
    async findAllNetworksByUser(userInfo, res){
        let {ownerEmail} = userInfo;
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
                    message: `Incorrect user ${this.ownerEmail}`
                }
                })
            }
            NeuralNetwork.find({ownerEmail : ownerEmail}, function(err, docs) {
                if (err) {
                    return res.status(400).json({
                       ok: false,
                       err,
                    });
                }
                res.json({
                    ok: true,
                    networks: docs
                 });
            })
        })
    }
}

module.exports = {
    NeuralNetworkService
}