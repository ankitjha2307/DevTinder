const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173/",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// 🛡️ Middleware setup
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
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
