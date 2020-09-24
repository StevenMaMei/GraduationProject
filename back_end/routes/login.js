const express = require('express');
const { AuthenticationService } = require('../services/AuthenticationService')
const app = express();

app.post('/login', async function (req, res, next) {
   let body = req.body;
   let {userCredentials} = body;
   let authenticationService = new AuthenticationService();
   try{
      await Promise.resolve(authenticationService.login(userCredentials,res));
   }catch(err){
      next(err)
   }
})

module.exports = app;