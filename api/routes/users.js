const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");

//////////////////////////GET all users
router.get("/", (request, response, next) => {
  User.find()
    .exec()
    .then(docs => {
      console.log(docs);
      response.status(200).json(docs);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({
        error: error
      });
    });
});

////////////////////////////// GET one user by ID
router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

///////////////////////// POST user
router.post("/", (request, response, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    address: request.body.address,
    userType: request.body.userType,
    addressNumber: request.body.addressNumber,
    addressStreet: request.body.addressStreet,
    addressCity: request.body.addressCity,
    addressState: request.body.addressState,
    addressZipcode: request.body.addressZipcode
  });

  user
    .save()
    .then(result => {
      response.status(201).json({
        message: "Created a new User sucessfully"
      });
      console.log(result);
    })
    .catch(error => console.log(error));
  response.status(500).json({
    error: error
  });
});

/////////////////// PATCH one user
router.patch("/:userId", (request, res, next) => {
  const id = request.params.userId;
  const updateOperations = {};
  for (const operations of request.body) {
    updateOperations[operations.propName] = operations.value;
  }
  User.update({ _id: id }, { $set: updateOperations })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

/////////////////// DELETE one user
router.delete("/:userId", (request, response, next) => {
  const id = request.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      response.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({
        error: error
      });
    });
});
module.exports = router;
