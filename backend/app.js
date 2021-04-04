//ehQcVP7N4COIDvMl
const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/keys");
mongoose.connect(MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify:true
});
mongoose.connection.on("connected", () => {
  console.log("mongoose connected");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

require("./models/user");
require("./models/expenses");
const authroutes = require("./routes/auth");
const expensesRoutes = require("./routes/expense");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
app.use(express.json());
app.use(authroutes);
app.use(expensesRoutes);
app.get("/test", (req, res) => {
  if (!req.headers.authorization) {
    console.log(req.headers.authorization);
    return res.send("you need to login");
  }
});
app.listen(3000, () => {
  console.log(" hello from 3000");
});
