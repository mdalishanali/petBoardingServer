require("dotenv").config("./config.env");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");
const res = require("express/lib/response");

/**===================GENRATING TOKEN TO SEND FRONTEND===========  */
let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "PetBoarding";
const newToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET_KEY);
};

/**=================USER REGISTER=====  ============================= */
const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) {
      return res.status(400).send({ message: "Please try another email" });
    }

    user = await User.create(req.body);

    const token = newToken(user);
    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**=================***LOGIN***================================== */
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "User Account does not exist" });
    }
    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res
        .status(400)
        .send({ message: "Please try another email or password" });
    }
    const token = newToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { register, login };
