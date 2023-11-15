// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const serverless = require('serverless-http');

// routes functions
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');

// application
const app = express();

// middleware
app.use(express.json());
// cookies parser permission
app.use(cookieParser());
// cookie parser
app.use((req, res, next) => {
  // Allow CORS Origin
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  console.log(req.path, req.method);
  next();
});

// routes
app.use('/.netlify/functions/api', authRoutes);
app.use('/.netlify/functions/api', articleRoutes);

// connect to db
mongoose
  .connect('mongodb+srv://rustiandazen09:u-SVAFN_YL3ar86@cluster0.32f4s9e.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    // listen for requests
    app.listen(4000, () => {
      console.log('listening on port ' + 4000 + '!');
    });
    console.log('successfully connect to db');
  })
  .catch((error) => {
    console.log(error);
  });

module.exports.handler = serverless(app);
