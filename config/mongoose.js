require("dotenv").config();
const mongoose = require("mongoose");

// mongoDB atlas uri
const URI = process.env.URI;

// connecting to mongoDB atlas
const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to DataBase :: MongoDB");
};
// export
module.exports = connectDB;
