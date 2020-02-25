const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");

///////////////////////// CREATE one user
router.post("/add", (request, response, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: request.body.username
  });
  user
    .save()
    .then(result => {
      response.status(201).json({
        message: "Created a new User sucessfully"
      });
      console.log(result);
    })
    .then(() => {
      response.redirect("/");
    })
    .catch(error => console.log(error));
  response.status(500).json({
    error: error
  });
});

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
router.get("/:userId", (request, response, next) => {
  const id = request.params.userId;
  User.findById(id)
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
      response.status(500).json({ error: err });
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
