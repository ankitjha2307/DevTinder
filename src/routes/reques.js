const express = require("express");
const { userAuth } = require("../Middleware/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  console.log("Connection request sending...");

  res.send(user.firstName + " send the connection request");
});

module.exports = requestRouter;
