const mongoose = require("mongoose");

const spotSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  spotType: { type: String },
  website: { type: String, required: false },
  coverImageUrl: { type: String, required: false },
  addressNumber: { type: Number, required: false },
  addressStreet: { type: String, required: false },
  addressCity: { type: String, required: false },
  addressState: { type: String, required: false },
  addressZipcode: { type: Number, required: false }
});

module.exports = mongoose.model("Spot", spotSchema);
