const express = require("express");
const connectDB = require("./config/database");

const app = express();

connectDB()
  .then(() => {
    console.log("DB connect Sucess");
  })
  .catch((err) => {
    console.error("DB connection Failed");
  });

app.listen(7777, () => {
  console.log("7777 is Listning");
});
