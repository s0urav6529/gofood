const mongoose = require("mongoose");

const foodCategorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("foodCategory", foodCategorySchema);
