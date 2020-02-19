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

router.post("/", (request, response, next) => {
  const spot = new spot({
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
