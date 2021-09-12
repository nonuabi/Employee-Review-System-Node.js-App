require("dotenv").config();
const express = require("express");
const connectDB = require("./config/mongoose");
// port define
const port = process.env.PORT || 8080;

// calling express
const app = express();

// calling mongoose
connectDB();

// static files
app.use("/assets", express.static("./assets"));

// EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// router path
app.use("/", require("./router"));

//listing to the post and checking errors if any
app.listen(port, function (err) {
  if (err) {
    console.log(`Server Error :: ${err}`);
    return;
  }
  console.log(`Server is running on port no :: ${port}`);
});
