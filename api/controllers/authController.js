const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const jwtSecret = 'DVVC1OPrPYKJpLTEkJ7RkQ4R1dw5SZxG';
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
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
      jwt.sign({ email: userDoc.email, name: userDoc.name, id: userDoc._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.staus(422).json('password not ok');
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
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

module.exports = { register, login, logout, profile };
