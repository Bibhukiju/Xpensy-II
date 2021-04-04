const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/user");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/keys");

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
  bcrypt.compare(password, hashedPassword, (err, doMatch) => {
    if (doMatch) {
      const token = jwt.sign({ _id: savedUser._id }, SECRET);
      res.send({ token });
    } else {
      res.status(400).send({ msg: "Invalid credentials" });
    }
  });
});
module.exports = router;
