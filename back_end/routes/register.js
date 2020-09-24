const express = require('express');
const { AuthenticationService } = require('../services/AuthenticationService')
const app = express();
app.post('/register', async function (req, res,next) {
  let body = req.body;
  let { user } = body;

  let authenticationService = new AuthenticationService();
  try{
    await Promise.resolve(authenticationService.registerUser(user,res));
  }catch(err){
    next(err);
  }

});
module.exports = app;