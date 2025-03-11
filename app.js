const express = require('express');
const dotenv = require("dotenv");
const session = require('express-session');
const mongodb = require('./config/database');
const routes = require('./routes');

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();





mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to MongoDB and listening on ${port}`);
    }
  });
  