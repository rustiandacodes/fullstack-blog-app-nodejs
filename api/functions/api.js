// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const serverless = require('serverless-http');

//upload photos requirments
const fs = require('fs');
const multer = require('multer');
const photosMiddleware = multer({ dest: 'uploads/' });

// routes functions
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');

// application
const app = express();

// middleware
app.use(express.json());
// cookies permission
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

// shows photos
app.use('/.netlify/functions/api/uploads', express.static(__dirname + '/uploads'));

// upload photos
app.post('/.netlify/functions/api/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads', ''));
  }
  res.json(uploadedFiles);
});

// delete photos
app.post('/.netlify/functions/api/delete-image', async (req) => {
  const { fileNames } = req.body;
  const path = __dirname + '/uploads/' + fileNames;
  fs.unlinkSync(path);
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
