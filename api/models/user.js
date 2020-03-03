const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4
  }
});

module.exports = mongoose.model("User", userSchema);
