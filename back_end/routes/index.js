const express = require('express')
const app = express()

app.use(require('./login'));
app.use(require('./register'));
app.use(require('./neuralNetwork'));
app.use(require('./forgotAndResetPassword'));
module.exports = app;