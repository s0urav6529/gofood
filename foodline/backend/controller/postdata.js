// external module
const express = require("express");
const postdata = express.Router();
const foodCategoryModel = require("../models/foodCategoryModel")
const foodItemsModel = require("../models/foodItemsModel")

postdata.route("/postData").post(async (req, res) => {

    try {
      await foodItemsModel.create({
        categoryName:req.body.categoryName,
        name:req.body.name,
        img:req.body.img,
        option:req.body.option,
        description:req.body.description
      });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false });
    }
})

module.exports = postdata