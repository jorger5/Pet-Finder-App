const mongoose = require("mongoose");

let petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    race: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    city: {
      type: String,
      required: true,
    },
    owner: {
      type: Array,
    },
  },
  {
    collection: "pets",
  }
);

module.exports = mongoose.model("Pet", petSchema);
