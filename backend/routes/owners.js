const express = require("express");
const router = express.Router();
const {
  getOwners,
  getOwner,
  getOwnerPet,
  addOwner,
  ownerRegister,
  ownerSignin,
  deleteOwner,
  updateOwner,
  loginRequired,
} = require("../controllers/ownerController");

router.route("/owners").get(loginRequired, getOwners);
router.route("/create-owner").post(addOwner);
router.route("/owners/:id").get(getOwner, getOwnerPet);
router.route("/owners/:id/pets").get(getOwnerPet);
router.route("/owners/:id").put(updateOwner);
router.route("/owners/:id").delete(loginRequired, deleteOwner);

router.route("/register").post(ownerRegister);
router.route("/sign_in").post(ownerSignin);

module.exports = router;
