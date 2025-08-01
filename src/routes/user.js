const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../Middleware/auth");
const ConnectionRequest = require("../model/connectionRequest");

userRouter.get("/user/request/recived", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "age",
      "about",
      "skills",
    ]);

    res.json({ message: "Data fetched Succesfully", data: connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
