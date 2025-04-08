const express = require('express');
const dotenv = require("dotenv");
const session = require('express-session');
const mongodb = require('./config/database');
const passport = require('./config/passport');
const cors = require('cors');
const allowedOrigins = 'https://mythsmith.onrender.com';
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

app.use(cors({
  origin: "https://mythsmith.onrender.com", // or wherever Swagger is running
  credentials: true // important for cookies/sessions
}));

app
.use(express.json())
.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
}))
.use(passport.initialize())
.use(passport.session()) // Enable persistent login

.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}))

.use('/', require('./routes'));

if (require.main === module) {
  mongodb.initDb((err) => {
    if (err) {
      console.log("Failed to connect to MongoDB", err);
      process.exit(1);
    }
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
}
  
module.exports = app;