const express = require('express');
const { NeuralNetworkService } = require('../services/NeuralNetworkService')
const app = express();

app.post('/neuralNetwork/save', async function (req, res,next) {
    let body = req.body;
    let { neuralNetwork } = body;
  
    let neuralNetworkService = new NeuralNetworkService();
    try{
      await Promise.resolve(neuralNetworkService.saveNeuralNetwork(neuralNetwork,res));
    }catch(err){
      next(err);
    }
  
  });
module.exports = app;