const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "pet", required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    status: { type: String, default: "pending" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const bookingSc = mongoose.model("booking", bookingSchema);
module.exports = bookingSc;
