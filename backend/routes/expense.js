const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");
require("../models/user");
const Expenses = mongoose.model("Expenses");

router.post("/add", requirelogin, async (req, res) => {
  const { title, amount, pdate } = req.body;
  try {
    if (!title || !amount || !pdate) {
      return res.status(422).send({ msg: "Ërror" });
    }
    const xpense = new Expenses({
      title,
      amount,
      pdate,
      postedBy: req.user,
    });
    const result = xpense.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
router.get("/", requirelogin, async (req, res) => {
  const myPost = await Expenses.find({ postedBy: req.user._id }).populate(
    "postedBy",
    "_id name"
  );
  res.send(myPost);
});

module.exports = router;
