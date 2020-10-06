const express = require('express');
const { checkToken } = require('../middlewares/checkToken')
const { NeuralNetworkService } = require('../services/NeuralNetworkService')
const app = express();

app.post('/neuralNetwork/save', checkToken , async function (req, res,next) {
    let body = req.body;
    let { neuralNetwork } = body;
  
    let neuralNetworkService = new NeuralNetworkService();
    try{
      await Promise.resolve(neuralNetworkService.saveNeuralNetwork(neuralNetwork, req.decoded,res));
    }catch(err){
      next(err);
    }
  
  });

app.get('/neuralNetwork/:ownerEmail', async function (req, res,next) {
  let userInfo = req.params;
  let neuralNetworkService = new NeuralNetworkService();
  try{
    await Promise.resolve(neuralNetworkService.findAllNetworksByUser(userInfo,res));
  }catch(err){
    next(err);
  }

});
module.exports = app;