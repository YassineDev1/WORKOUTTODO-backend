const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ email: this.email}, "jwtPrivateKey");
  return token;
};
const User = (module.exports = mongoose.model("User", UserSchema));
