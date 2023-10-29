const mongoose = require("mongoose");

// This path is from mongo atlas
const mongoURI =
  "mongodb+srv://Foodline:12345@cluster0.szpnieh.mongodb.net/?retryWrites=true&w=majority";

const databaseConnection = async () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Database connection established!"))
    .catch((err) => console("Database not connected"));
};

module.exports = databaseConnection;
