const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ msg: "You must logged in first  " });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ msg: "You must logged in first  " });
    }
    const { _id } = payload;
    await User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
