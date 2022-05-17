const mongoose = require("mongoose");

const EntityDataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    cost: { type: Number, required: true },
    watch: { type: Number, required: true },
    rating: { type: Number, required: true },
    verified: { type: String, default: "yes" },
    petTypes: { type: String, required: true },
    petSize: { type: String, required: true },
    petSupervision: { type: String, required: true },
    petUnsupervision: { type: String, required: true },
    sleepingPlace: { type: String, required: true },
    poty: { type: String, required: true },
    walkPerDay: { type: Number, required: true },
    typeofHome: { type: String, required: true },
    outdoorSize: { type: String, required: true },
    emergencyTransport: { type: String, required: true },
    summary: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);
const PetEntity = new mongoose.model("petEntities", EntityDataSchema);
module.exports = PetEntity;
