const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const booking = require("../models/booking.model");
const router = express.Router();
//
router.get("/", async (req, res) => {
  try {
    // if ((req.query.admin = "admin")) {
    let allbooking = await booking
      .find()
      .populate({ path: "petId", select: ["name"] });
    return res.status(200).send(allbooking);
    // }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//
router.post("/", async (req, res) => {
  try {
   // console.log(req);
    let allbooking = await booking.create(req.body);
    return res.status(200).send(allbooking);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//
router.get("/:id", async (req, res) => {
  try {
    let booking = await booking.findById(req.params.id).lean().exec();
    return res.status(200).send(booking);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//
router.delete("/:id", async (req, res) => {
  try {
    let booking = await booking.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(booking);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//
router.patch("/:id", async (req, res) => {
  try {
    let booking = await booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(booking);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
module.exports = router;
