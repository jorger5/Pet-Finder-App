const Pet = require("../models/Pet");

exports.getPets = async (req, res, next) => {
  try {
    const pets = await Pet.find();

    return res.status(200).json({
      success: true,
      data: pets,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.addPet = async (req, res, next) => {
  try {
    const pet = await Pet.create(req.body);

    return res.status(201).json({
      success: true,
      data: pet,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
};

exports.getPet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: pet,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: "Pet not found",
    });
  }
};

exports.updatePet = async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, { $set: req.body });
    return res.status(201).json({
      success: true,
      data: pet,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "There was an error updating the pet",
    });
  }
};

exports.deletePet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({
        success: false,
        error: "Pet not found",
      });
    }

    await pet.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
