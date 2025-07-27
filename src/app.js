const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    // res.send("Rout Handler 1");
    next();
  },
  (req, res, next) => {
    // res.send("Rout Handler 2");
    next();
  },
  (req, res, next) => {
    // res.send("Rout Handler 3");
    next();
  },
  (req, res, next) => {
    res.send("Rout Handler 4");
  }
);

app.listen(7777, () => {
  console.log("7777 is Listning");
});

// Ankit jha
