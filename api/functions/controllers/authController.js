const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'DVVC1OPrPYKJpLTEkJ7RkQ4R1dw5SZxG';

const getUserDataFromToken = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
};

const register = async (req, res) => {
  const { name, email, password, photos, address, phone } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      photos,
      address,
      phone,
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('password not ok');
    }
  } else {
    res.json('user not found');
  }
};

const logout = (req, res) => {
  res.cookie('token', '').json(true);
};

const profile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, phone, address, _id } = await User.findById(userData.id);
      res.json({ name, email, phone, address, _id });
    });
  } else {
    res.json(null);
  }
};

// update profile
const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const userData = await getUserDataFromToken(req);
  const userDoc = await User.findById(userData.id);
  userDoc.set({
    name,
    email,
  });
  const response = await userDoc.save();
  res.status(200).json(response);
};

// get password
const changePassword = async (req, res) => {
  const { id, newPassword, lastPassword } = req.body;
  const userDoc = await User.findById(id);
  const passOk = bcrypt.compareSync(lastPassword, userDoc.password);
  if (passOk) {
    userDoc.set({
      password: bcrypt.hashSync(newPassword, bcryptSalt),
    });
    const { name, email } = userDoc.save();
    res.status(200).json(name, email);
  }
};

module.exports = { register, login, profile, logout, updateProfile, changePassword };
