require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { SECRET } = require("../config/keys");
const router = express.Router();
// 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

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).send({ err: "Please complete all the Credentials" });
  } else {
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      return res
        .status(422)
        .send({ msg: `User associated with ${email} already exists` });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ msg: "User saved" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  if (!email || !password) {
    res.status(422).send("Please fill all the credentials");
  }
  const savedUser = await User.findOne({ email: email });
  if (!savedUser) {
    return res.status(422).send({ msg: "Invalid credentials" });
  }
  bcrypt.compare(password, savedUser.password, (err, doMatch) => {
    if (doMatch) {
      const token = jwt.sign({ _id: savedUser._id }, SECRET);
      res.send({ token });
    } else {
      res.status(400).send({ msg: "Invalid credentials" });
    }
  });
});
module.exports = router;
