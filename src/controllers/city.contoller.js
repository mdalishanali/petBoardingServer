const express = require("express");
const city = require("../models/cities.model");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    let city = await city.create(req.body);
    return res.status(200).send(city);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let cityName = await city.find().lean().exec();
    return res.status(200).send(cityName);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let cityName = await city.findByIdAndUpdate(req.params.id, { new: true });
    return res.status(200).send(cityName);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let cityName = await city.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(cityName);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
