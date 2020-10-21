const express = require('express');
const { AuthenticationService } = require('../services/AuthenticationService')
const { registerUserSchema } = require('../schemas/userSchema');
const validationHandler = require('../middlewares/validationHandler');

const app = express();
app.post('/register', validationHandler(registerUserSchema), async function (req, res,next) {
  let body = req.body;
  let { user } = body;
  console.log(user);
  let authenticationService = new AuthenticationService();
  try{
    await Promise.resolve(authenticationService.registerUser(user,res));
  }catch(err){
    next(err);
  }

});
module.exports = app;