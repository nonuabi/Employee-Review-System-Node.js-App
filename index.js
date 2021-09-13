require("dotenv").config();
const express = require("express");
const connectDB = require("./config/mongoose");

// used for session cookies
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/password-local-strategy");

// port define
const port = process.env.PORT || 8080;

// calling express
const app = express();

// calling mongoose
connectDB();

app.use(express.urlencoded({ extended: true }));

// static files
app.use("/assets", express.static("./assets"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "employe-review-system",
    secret: process.env.PASSPORT_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookies: {
      maxAge: 10000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
