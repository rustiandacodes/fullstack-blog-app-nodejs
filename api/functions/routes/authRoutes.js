const express = require('express');

const router = express.Router();

const { register, login, logout, profile, updateProfile, changePassword } = require('../controllers/authController');

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/profile', profile);

router.put('/update-profile', updateProfile);

router.put('/change-password', changePassword);

module.exports = router;
