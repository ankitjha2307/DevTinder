const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.send("User Added Succesfully");
  } catch {
    res.status(400).send("Something Went wrong");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });

    res.send(users);
  } catch (err) {
    res.status(400).send("user email's not found");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("user email's not found");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
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
