const express = require('express');

const router = express.Router();

const { register, login, logout, profile, updateProfile } = require('../controllers/authController');

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/profile', profile);

router.put('/update-profile', updateProfile);

module.exports = router;
