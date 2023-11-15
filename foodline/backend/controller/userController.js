//external module
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//internal module
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");

const createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    await userModel.create({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      password: hashedPassword,
    });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userData = await userModel.findOne({ email });
    if (!userData) {
      res.status(400).json({ success: false });
    } else if (!(await bcrypt.compare(password, userData.password))) {
      res.status(400).json({ success: false });
    } else {
      // create payload for jwt
      const userObject = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(userObject, process.env.JWT_ACCESS_TOKEN);

      res.json({ success: true, authToken: authToken });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const checkOutFood = async (req, res) => {
  let data = req.body.orderedFood;
  await data.splice(0, 0, { orderedDate: req.body.orderedDate });

  const userExist = await orderModel.findOne({ email: req.body.userEmail });

  if (userExist === null) {
    /* need to add user */

    try {
      await orderModel.create({
        email: req.body.userEmail,
        orderedFood: [data],
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.json({ success: false });
    }
  } else {
    /* need to update user */
    try {
      await orderModel
        .findOneAndUpdate(
          { email: req.body.userEmail },
          { $push: { orderedFood: [data] } }
        )
        .then(() => {
          res.status(200).json({ success: true });
        });
    } catch (error) {
      res.json({ success: false });
    }
  }
};

const myOrders = async (req, res) => {
  try {
    const myData = await orderModel.findOne({ email: req.body.userEmail });
    res.status(200).json({ orderData: myData.orderedFood });
  } catch (error) {
    res.status(500).json("Server Error", error.message);
  }
};

module.exports = { createUser, loginUser, checkOutFood, myOrders };
