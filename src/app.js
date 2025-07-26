const express = require("express");

const app = express();

app.use((req, res) => {
  res.send("Hello from the server! yes");
});

app.listen(3000, () => {
  console.log("server is succefully listing on 3000....");
});

// Ankit jha
