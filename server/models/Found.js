const mongoose = require("mongoose");

const foundSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    dateFound: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
    },

    status: {
  type: String,
  enum: ["Found", "Claimed"],
  default: "Found",
},

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Found", foundSchema);