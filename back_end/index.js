const { config } = require('./config/index');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}`;
console.log(MONGO_URI);

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

app.get('/json', function(req, res) {
  res.json({ hello: 'world' });
});

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});