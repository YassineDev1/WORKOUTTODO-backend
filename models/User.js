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
  const accessToken = jwt.sign({ email: this.email }, "jwtPrivateKey");
  const refreshToken = jwt.sign(
    { email: this.email },
    "refreshTokenPrivateKey",
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};
const User = (module.exports = mongoose.model("User", UserSchema));
