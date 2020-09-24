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

    async login(userCredentials, res){
        let {email, password} = userCredentials;
        User.findOne({ email: email }, (erro, userDB)=>{
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
    }
}

module.exports = {
    AuthenticationService
}