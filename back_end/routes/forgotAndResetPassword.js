//taken and adapted from http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
const { config } = require('../config/index');
const express = require('express');
const app = express();
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const User = require('../model/user');
const bcrypt = require('bcrypt');

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const myOAuth2Client = new OAuth2(
    config.emailClientID,
    config.emailClientSecret,
    "https://developers.google.com/oauthplayground"
    );
myOAuth2Client.setCredentials({
    refresh_token: config.emailRefreshToken
});
const myAccessToken = myOAuth2Client.getAccessToken()

app.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
              return res.status(400).json({
                ok: false,
                message: "no user found",
             });
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: config.email, 
                clientId: config.emailClientID,
                clientSecret: config.emailClientSecret,
                refreshToken: config.emailRefreshToken,
                accessToken: myAccessToken.token
            }
        });
        var mailOptions = {
          to: user.email,
          from: config.email,
          subject: 'NeuralNetwork reset password',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
            res.json({
                ok: true,
                message: "An email has been sent to you"
             });
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
    //   res.redirect('/forgot');
    res.json({ok: true});
    });
  });

  app.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            return res.status(400).json({
              ok: false,
              message: "Invalid token",
           });
          }
  
          user.password = bcrypt.hashSync(req.body.password, 10);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
  
          user.save(function(err) {
            done(err, user);
          });
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              type: "OAuth2",
              user: config.email, 
              clientId: config.emailClientID,
              clientSecret: config.emailClientSecret,
              refreshToken: config.emailRefreshToken,
              accessToken: myAccessToken.token
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'passwordreset@demo.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          res.json({
            ok: true,
            message: "Password successfully changed"
          });
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
  });

  module.exports = app;
