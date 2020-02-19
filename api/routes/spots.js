const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Spot = require("../models/spot");

router.get("/", (request, response, next) => {
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

// GET one spot
router.get("/:spotId", (req, res, next) => {
  const id = req.params.spotId;
  Spot.findById(id)
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

// POST spot
router.post("/", (request, response, next) => {
  const spot = new Spot({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    address: request.body.address,
    spotType: request.body.spotType
  });
  spot
    .save()
    .then(result => {
      console.log(result);
      response.status(201).json({
        message: "Handling POST requests to /spots",
        createdSpot: result
      });
    })
    .catch(error => console.log(error));
  response.status(500).json({
    error: error
  });
});

module.exports = router;
