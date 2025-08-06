const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGOURI);
};

module.exports = connectDB;
