const express = require('express');
const { AuthenticationService } = require('../services/AuthenticationService')
const app = express();
app.post('/register', async function (req, res) {
  let body = req.body;
  let { user } = body;

  let authenticationService = new AuthenticationService();

  await Promise.resolve(authenticationService.registerUser(user,res));

});
module.exports = app;