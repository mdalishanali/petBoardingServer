const mongoose = require("mongoose");
const citiesSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const city = mongoose.model("cities", citiesSchema);
module.exports = city;
