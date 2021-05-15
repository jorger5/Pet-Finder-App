const express = require("express");
const router = express.Router();
const {
  getPets,
  addPet,
  getPet,
  updatePet,
  deletePet,
} = require("../controllers/petController");

router.route("/pets").get(getPets);
router.route("/create-pet").post(addPet);
router.route("/pets/:id").get(getPet);
router.route("/pets/:id").put(updatePet);
router.route("/pets/:id").delete(deletePet);

module.exports = router;
