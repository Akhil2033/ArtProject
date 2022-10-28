const Mongoose = require("mongoose");
require('dotenv').config();

const localDB = process.env.db_link;

const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;
