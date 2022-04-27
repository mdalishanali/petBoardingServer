const mongoose = require("mongoose");
require("dotenv").config();
const DBI = process.env.DB;
let url =
  "mongodb+srv://ali:ali@cluster0.c5wi7.mongodb.net/PetBoarding?retryWrites=true&w=majority";

module.exports = () => {
  return mongoose.connect(url);
};
