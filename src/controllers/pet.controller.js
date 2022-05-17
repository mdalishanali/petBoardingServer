const express = require("express");
const Pet = require("../models/pet.model");
const router = express.Router();
const PetData = require("../models/pet.model");

/**=====================POST REQUEST TO GET THE ONE ITEM============================ */
router.post("/", async (req, res) => {
  try {
    let pet = await PetData.create(req.body);
    return res.status(200).send(pet);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
/**=====================GET req TO GET THE ALL THE PET WITH THAT USER ASSOCIATED============================ */
router.get("/", async (req, res) => {
  try {
    //http://localhost:1234/pet?user=626bbae6f6d3c0027d2f6f95
    let pet = await PetData.find({ userId: req.query.user }).lean().exec();
    return res.status(200).send(pet);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
/**=====================To GET THE SINGLE PET DETAILS============================ */
router.get("/:id", async (req, res) => {
  try {
    let pet = await PetData.findById(req.params.id).lean().exec();
    return res.status(200).send(pet);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
/**=====================DELTE REQ TO DELETE A SINGLE PET    =========================== */
router.delete("/:id", async (req, res) => {
  try {
    let pet = await PetData.findByIdAndDelete(req.param.id).lean().exec();
    return res.status(200).send(pet);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
/**=====================POST REQUEST TO GET THE ONE ITEM============================ */
/**=====================POST REQUEST TO GET THE ONE ITEM============================ */

module.exports = router;
