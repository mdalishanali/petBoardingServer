const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const authenticate = require("../middlewares/authenticate");
const authorization = require("../middlewares/authorization");
const router = express.Router();
//================NOT NECESSARY TO WRITE THE SAME COLLECTION NAME FOR PERFORMING ACTIONS====
const petEntity = require("../models/entity.list");
/**==============GEt INTITY DATA WITH PAGINATION CAN ACCESS TO ANYONE USER AND ADMIN============= */
router.get("/", async (req, res) => {
  //http://localhost:1234/entity?size=1&page=8
  //http://localhost:1234/entity?size=4&page=2
  try {
    let { page, size, sort } = req.query;
    page = page || 1;
    size = size || 2;

    let entity = await petEntity
      .find({})
      .skip((page - 1) * size)
      .limit(size)
      .sort({ name: 1 })
      .lean()
      .exec();

    let totalPage = Math.ceil((await petEntity.countDocuments()) / size);
    if (sort == "name") {
      let entity = await petEntity.find({}).sort({ name: -1 }).lean().exec();

      return res.status(200).send({ entity, totalPage });
    }
    if (sort == "address") {
      let entity = await petEntity.find({}).sort({ address: -1 }).lean().exec();
      return res.status(200).send({ entity, totalPage });
    } else {
      console.log("totalPage", totalPage);
      return res.status(200).send({ entity, totalPage });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
/**=====================GET REQUEST TO GET THE ONE ITEM============================ */
router.get("/:id", authenticate, authorization, async (req, res) => {
  try {
    let entity = await petEntity.findById(req.params.id).lean().exec();
    return res.status(200).send(entity);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
/**=====================POST REQUEST ONLY ADMIN CAN ADD NEW ENTITY TO THE PAGE============================ */
router.post("/", authenticate, authorization, async (req, res) => {
  //authenticate req is available everywhere we learn in middleware
  try {
    //await console.log("reqUserMagic", req.user);
    req.body.user_id = req.user._id; //lhs comes form schema === RHS comes from the token object
    //we are just putting the user id
    let entity = await petEntity.create(req.body);
    return res.status(200).send({ entity });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});
/**=====================PATCH REQUEST ONLY ADMIN CAN ADD NEW ENTITY TO THE PAGE============================ */
router.patch("/:id", authenticate, authorization, async (req, res) => {
  try {
    let entity = await petEntity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(400).send(entity);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
/**=====================POST REQUEST ONLY ADMIN CAN ADD NEW ENTITY TO THE PAGE============================ */
router.delete("/:id", authenticate, authorization, async (req, res) => {
  try {
    let entity = await petEntity.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(entity);
  } catch (error) {}
});
module.exports = router;
