//external module
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

//external module
const databaseConnection = require("./configuration/db");
const userRoute = require("./routes/userRoute");
const displayFoodRoute = require("./routes/displayFoodRoute");
const postdata = require("./controller/postdata");
databaseConnection();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Request-With,Content-Type,Accept"
  );
  next();
});

//json body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use user Route
app.use("/api", userRoute);
app.use("/api", displayFoodRoute);
app.use("/api", postdata);

// server start
app.listen(process.env.PORT, () => {
  console.log(`App listening to port ${process.env.PORT}`);
});
