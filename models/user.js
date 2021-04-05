const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailtoken: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

mongoose.model("User", userSchema);
