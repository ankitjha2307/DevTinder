const express = require("express");

const app = express();

const { adminAuth } = require("./Middleware/auth");

app.use("/admin", adminAuth);

app.get("/user", (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.listen(7777, () => {
  console.log("7777 is Listning");
});

// Ankit jha
