//external module
const bcrypt = require("bcrypt");

//internal module
const userModel = require("../models/userModel");

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
    let userData = await userModel.findOne({ email });
    if (!userData) {
      res.status(400).json({ success: false });
    } else if (!(await bcrypt.compare(password, userData.password))) {
      res.status(400).json({ success: false });
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

module.exports = { createUser, loginUser };
