const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connectDb = require("./src/connection");
const User = require("./src/User.model");

const PORT = 8080;
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const users = await User.find();

  // res.json(users);
  res.render('index', { users })

});

app.get("/user-create", async (req, res) => {
  const user = new User({ username: "userTest" });

  await user.save().then(() => console.log("User created"));

  res.send("User created \n");
});

app.get("/user-create/:name", async (req, res) => {
  const user = new User({ username: req.params.name });

  await user.save().then(() => console.log("User created"));

  res.send("User created \n");
});

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});
