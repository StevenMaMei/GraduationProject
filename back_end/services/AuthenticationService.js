const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const app = express();

class AuthenticationService {
     async registerUser(user,res) {
        let {name, email, password} = user;
        let usuario = new User({
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        });
        usuario.save((err, usuarioDB) => {
            if (err) {
              return res.status(400).json({
                 ok: false,
                 err,
              });
            }
            res.json({
                  ok: true,
                  usuario: usuarioDB
               });
            })
    }
}

module.exports = {
    AuthenticationService
}