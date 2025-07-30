const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();

    res.send("User Added Succesfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // if (!validator.isEmail(emailId)) {
    //     throw new Error("Email is not Valid");
    //   }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DEV@TINDER");
      console.log(token);

      res.cookie("token", token);

      res.send("Login Succesfull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;

    if (!token) {
      throw new Error("Invalid Token");
    }

    const isTokenValid = await jwt.verify(token, "DEV@TINDER");

    const { _id } = isTokenValid;

    console.log("Logged in user is " + _id);

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User is not found ");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
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

app.patch("/signup", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("User Updates Succesfully");
  } catch (err) {
    res.status(400).send("Update Faildef" + err.message);
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
