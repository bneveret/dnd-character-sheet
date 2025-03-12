const express = require('express');
const dotenv = require("dotenv");
//const session = require('express-session');
const mongodb = require('./config/database');
const routes = require('./routes');

require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to MongoDB and listening on ${port}`);
    }
  });
  