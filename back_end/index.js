const { config } = require('./config/index');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');
const cors = require('cors');

app.options('*', cors()); 

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});
const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./middlewares/errorHandlers');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}`;


app.use(express.json());
app.use(routes);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  
  console.log("BD online");
});

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/json',cors(), function(req, res) {
  res.json({ hello: 'world' });
});

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
