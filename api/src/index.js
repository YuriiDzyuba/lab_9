const express = require("express");
const mongoose = require("mongoose");
const { port, host, db, authApiUrl } = require("./configuration");
const { connectDb } = require("./helpers/db");
const random = require('random-name')

const app = express();
const userSchema = new mongoose.Schema({
  name: String,
  second_name: String
});
const User = mongoose.model("User", userSchema);

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

app.get("/testapidata", (req, res) => {
  res.json({
    testapidata: true
  });
});

app.get('/get-users', function(req, res) {
  const user = new User({ name: random.first(), second_name: random.last() });
  user.save(function(err, result) {
    if (err) return console.error(err);
    console.log("result", result);
  });
  User.find({}, function(err, users) {
    let userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Database url ${db}`);
    console.log(`Auth api url ${authApiUrl}`);


    const user = new User({ name: random.first(), second_name: random.last() });
    user.save(function(err, result) {
      if (err) return console.error(err);
      console.log("result", result);
    });
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
