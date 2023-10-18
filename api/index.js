// dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// routes functions
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');

// application
const app = express();

// cookie parser
app.use(cookieParser());

// middleware
app.use(express.json());
app.use((req, res, next) => {
  // Allow CORS Origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/.netlify/functions/api', authRoutes);
app.use('/.netlify/functions/api', articleRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('listening on port ' + process.env.PORT + '!');
    });
  })
  .catch((error) => {
    console.log(error);
  });
