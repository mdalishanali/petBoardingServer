const mongoose = require("mongoose");
const petSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    petName: { type: String, required: true },
    petSize: { type: Number, required: true },
    petType: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Pet = new mongoose.model("pet", petSchema);
module.exports = Pet;

// {
//   "userId":"626bbae6f6d3c0027d2f6f95",
//   "petName": "Puppy",
//   "petSize":"5kg",
//   "petType":"dog"
// }
