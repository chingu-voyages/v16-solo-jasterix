const mongoose = require("mongoose");

const spotSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  address: String,
  spotType: String
});

module.exports = mongoose.model("Spot", spotSchema);
