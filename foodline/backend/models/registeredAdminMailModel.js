const mongoose = require("mongoose");

const registeredAdminMailModelSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "registeredadminmail",
  registeredAdminMailModelSchema
);
