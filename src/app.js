const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  throw new Error("sdbncwlhb");
  res.send("User Data Sent");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something Went Wrong");
  }
});

app.listen(7777, () => {
  console.log("7777 is Listning");
});

// Ankit jha
