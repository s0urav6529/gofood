const mongoose = require("mongoose");

const databaseConnection = async () => {
  mongoose
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Database connection established!"))
    .catch((err) => console("Database not connected"));
};

module.exports = databaseConnection;
