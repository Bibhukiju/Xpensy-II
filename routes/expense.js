const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");
require("../models/user");
const Expenses = mongoose.model("Expenses");

// * Create
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
    res.send(xpense);
  } catch (error) {
    console.log(error);
  }
});

// * Read
router.get("/", requirelogin, async (req, res) => {
  const myPost = await Expenses.find({ postedBy: req.user._id }).populate(
    "postedBy",
    "_id name"
  );
  res.send(myPost);
});
// * update
router.patch("/update/:id", requirelogin, async (req, res) => {
  try {
    Expenses.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(500).send();
        }
        console.log(data);
        res.send(data);
      }
    );
  } catch (error) {}
});

// * delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const test = await Expenses.findOne({ _id: req.params.id });
    console.log(test);
    if (!test) {
      return res.send({ msg: "please send valid expense record" });
    }
    await Expenses.findByIdAndDelete(req.params.id);
    console.log("data deletd");
    res.status(200).send({ msg: "data deletd" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
