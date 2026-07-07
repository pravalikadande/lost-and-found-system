const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    foundItem: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Found",
  required: true,
},
    claimant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);