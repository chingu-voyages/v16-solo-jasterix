const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Spot = require("../models/spot");

///////////////////////// CREATE one spot
router.post("/newspot", (request, response, next) => {
  const spot = new Spot({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    address: request.body.address,
    spotType: request.body.spotType,
    addressNumber: request.body.addressNumber,
    addressStreet: request.body.addressStreet,
    addressCity: request.body.addressCity,
    addressState: request.body.addressState,
    addressZipcode: request.body.addressZipcode
  });

  spot
    .save()
    .then(result => {
      response.status(201).json({
        message: "Created a new Spot sucessfully"
      });
      console.log(result);
    })
    .catch(error => console.log(error));
  response.status(500).json({
    error: error
  });
});

//////////////////////////GET all spots
router.get("/spots", (request, response, next) => {
  Spot.find()
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

////////////////////////////// GET one spot by ID
router.get("/:spotId", (request, response, next) => {
  const id = request.params.spotId;
  Spot.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        response.status(200).json(doc);
      } else {
        response
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/////////////////// PATCH one spot
router.patch("/:spotId", (request, res, next) => {
  const id = request.params.spotId;
  const updateOperations = {};
  for (const operations of request.body) {
    updateOperations[operations.propName] = operations.value;
  }
  Spot.update({ _id: id }, { $set: updateOperations })
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

/////////////////// DELETE one spot
router.delete("/:spotId", (request, response, next) => {
  const id = request.params.spotId;
  Spot.remove({ _id: id })
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
