const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello");
});

app.use("/test", (req, res) => {
  res.send("testing the server");
});

app.use((req, res) => {
  res.send("Hello from the server! yes");
});

app.listen(3000, () => {
  console.log("server is succefully listing on 3000....");
});

// Ankit jha
