const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

const mongodburi = process.env.MONGODBURI || "default";
console.log(mongodburi);

const corsOptions = {
  origin: "https://dev-tinder-web-sage.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
};

// 🛡️ Middleware setup
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/reques");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database Connect Succesfully");
    app.listen(process.env.PORT, () => {
      console.log("7777 is Listning");
    });
  })
  .catch((err) => {
    console.error("Database connection Failed");
  });
