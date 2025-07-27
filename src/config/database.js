const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ankitjha0723:ankitjha0723@devtinder.qbzp02k.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
