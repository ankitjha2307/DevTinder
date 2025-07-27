const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "gaurav",
    lastName: "Jha",
    emailID: "ankitjha723@gmail.com",
    password: "AnkitJhaisverunice",
  });

  await user.save();

  res.send("User Added Succesfully");
});

connectDB()
  .then(() => {
    console.log("Database Connect Succesfully");
    app.listen(7777, () => {
      console.log("7777 is Listning");
    });
  })
  .catch((err) => {
    console.error("Database connection Failed");
  });
