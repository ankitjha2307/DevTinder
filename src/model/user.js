const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email adress " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
    },

    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/high-school-boy-with-glasses-suit_684058-940.jpg",
    },

    about: {
      type: String,
      default: "This is Default About of User",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@TINDER");
  return token;
};

module.exports = mongoose.model("User", userSchema);
