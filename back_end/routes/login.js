const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('./../model/user');
const app = express();

app.post('/login', function (req, res) {
   let body = req.body;
   let {user : {email, password} } = body;
   console.log(password)
    Usuario.findOne({ email: email }, (erro, userDB)=>{
        if (erro) {
          return res.status(500).json({
             ok: false,
             err: erro
          })
       }
      if (!userDB) {
         return res.status(400).json({
           ok: false,
           err: {
               message: "Incorrect user or password"
           }
        })
      }

      if (! bcrypt.compareSync(password, userDB.password)){
         return res.status(400).json({
            ok: false,
            err: {
              message: "Incorrect user or password"
            }
         });
      }

       let token = jwt.sign({
              usuario: userDB,
           }, process.env.AUTHENTICATION_SEED, {
           expiresIn: process.env.TOKEN_EXPIRATION
       })
       res.json({
           ok: true,
           usuario: userDB,
           token,
       })
   })
})

module.exports = app;