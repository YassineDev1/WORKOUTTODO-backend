const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  
  if (!user) return res.status(400).send("Invalid Email or password");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(400).send("Invalid Email or password");
  const accessToken = user.generateAuthToken();
  res.status(200).send(accessToken);
});

module.exports = router;
