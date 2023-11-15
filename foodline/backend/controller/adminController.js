//external module
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//internal module
const adminModel = require("../models/adminModel");
const registeredAdminMailModel = require("../models/registeredAdminMailModel");

const createAdmin = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const isAdminReffered = await registeredAdminMailModel.findOne({
      email: req.body.email,
    });

    if (isAdminReffered !== null) {
      await adminModel.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: hashedPassword,
      });
      res.json({ success: true });
    } else {
      res.json({
        success: false,
        message: "You are not permitted to be an admin!",
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Enter valid credentials!" });
  }
};

const loginAdmin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const adminData = await adminModel.findOne({ email });

    if (!adminData) {
      res.status(400).json({ success: false });
    } else if (!(await bcrypt.compare(password, adminData.password))) {
      res.status(400).json({ success: false });
    } else {
      // create payload for jwt
      const adminObject = {
        id: adminData.id,
      };

      const adminAuthToken = jwt.sign(
        adminObject,
        process.env.JWT_ACCESS_TOKEN
      );
      res.json({ success: true, adminAuthToken: adminAuthToken });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

module.exports = { createAdmin, loginAdmin };
