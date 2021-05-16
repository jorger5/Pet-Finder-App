const Owner = require("../models/Owner");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getOwners = async (req, res, next) => {
  try {
    const owners = await Owner.find();

    return res.status(200).json({
      success: true,
      data: owners,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.getOwner = async (req, res, next) => {
  try {
    const owner = await Owner.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: owner,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: "Owner not found",
    });
  }
};

exports.getOwnerPet = async (req, res, next) => {
  try {
    const owner = await Owner.findById(req.params.id);
    let body = {
      pets: owner.pets,
      owner: {
        name: owner.name,
        email: owner.email,
        address: owner.address,
        city: owner.city,
      },
    };
    return res.status(200).json({
      success: true,
      data: body,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: "Pets not found",
    });
  }
};

exports.addOwner = async (req, res, next) => {
  try {
    const owner = new Owner(req.body);

    owner.password = bcrypt.hashSync(req.body.password, 10);
    owner.save(function (err, owner) {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      } else {
        owner.password = undefined;
        return res.json(owner);
      }
    });

    return res.status(201).json({
      success: true,
      data: owner,
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

exports.ownerRegister = function (req, res) {
  var newOwner = new Owner(req.body);
  newOwner.password = bcrypt.hashSync(req.body.password, 10);
  newOwner.save(function (err, owner) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      owner.password = undefined;
      return res.json(owner);
    }
  });
};

exports.updateOwner = async (req, res, next) => {
  try {
    const owner = await Owner.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res.status(201).json({
      success: true,
      data: owner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "There was an error updating the owner",
    });
  }
};

exports.deleteOwner = async (req, res, next) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        error: "Owner not found",
      });
    }

    await owner.remove();

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

exports.ownerSignin = function (req, res) {
  Owner.findOne(
    {
      email: req.body.email,
    },
    function (err, owner) {
      if (err) throw err;
      if (!owner || !owner.comparePassword(req.body.password)) {
        return res.status(401).json({
          message: "Authentication failed. Invalid email or password.",
        });
      }
      return res.json({
        user: {
          email: owner.email,
          name: owner.name,
          _id: owner._id,
          token: jwt.sign(
            { email: owner.email, name: owner.name, _id: owner._id },
            "RESTFULAPIs"
          ),
          pets: owner.pets,
          loggedIn: true,
          address: owner.address,
          city: owner.city,
        },
      });
    }
  );
};

exports.loginRequired = function (req, res, next) {
  if (req.owner) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized owner" });
  }
};
