// external module
const express = require("express");
const postdata = express.Router();
const foodCategoryModel = require("../models/foodCategoryModel")
const foodItemsModel = require("../models/foodItemsModel")

postdata.route("/postData").post(async (req, res) => {

    const dataObject = {
      categoryName:req.body.categoryName,
      name:req.body.name,
      img:req.body.img,
      option:req.body.option,
      description:req.body.description
    };

    try {
      await foodItemsModel.create(dataObject);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
})

module.exports = postdata