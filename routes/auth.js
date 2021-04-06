require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { SECRET } = require("../config/keys");
const router = express.Router();
const sendEmail = require("../services/sendmail");
const crypto = require("crypto");
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
    const to = req.body.email;
    const user = new User({
      name,
      email,
      password: hashedPassword,
      emailtoken: crypto.randomBytes(32).toString("hex"),
    });
    await user.save().then(() => {
      sendEmail(
        to, //to
        `Hello Thank you for registration on xpenc http://${req.headers.host}/verifyemail?token=${user.emailtoken}`, //text
        "Verify your email", //subject
        `<h1>Xpenc</h1><p>Thank for registering with your app </p><br><a href="http://${req.headers.host}/verifyemail?token=${user.emailtoken}">Verify</a>` //html
      );
    });
    res.status(201).json({ msg: "Now pleas verify your account " });
  }
});

router.get("/verifyemail", async (req, res) => {
  try {
    const emailtoken = req.query.token;
    console.log(typeof emailtoken);
    const user = await User.findOne({ emailtoken: emailtoken });
    console.log(user);
    if (!user) {
      return res.status(404).send({ msg: "Token is invalid" });
    }
    user.emailtoken = null;
    user.isVerified = true;
    await user.save();
    res.status(200).send({ msg: "Account verified" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
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
