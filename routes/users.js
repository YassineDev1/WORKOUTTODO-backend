const express = require("express");
const User = require("../models/User");
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const router = express.Router();

router.post("/signup", async (req, res) => {
  let user = await User.findOne({ email: req.body?.email });
  if (user) return res.status(400).send("User already registred");
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  user = new User({
    name: name,
    email: email,
    password: hashedPass,
  });
  await user.save();
  const accessToken = user.generateAuthToken();
  return res.header("x-auth-token", accessToken).send(user);
});

router.post("/", (req, res) => {
  let users = User.findOne({});
  console.log("users", users);
});
module.exports = router;
