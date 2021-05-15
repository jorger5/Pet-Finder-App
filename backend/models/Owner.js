const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pets: {
      type: Array,
    },
    loggedIn: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  {
    collection: "owners",
  }
);

ownerSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Owner", ownerSchema);
