const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    address: String,
    photo: [String],
  },
  { timestamps: true }
);

const UserModel = mongoose.model('mernblog-User', UserSchema);

module.exports = UserModel;
