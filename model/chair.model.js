const mongoose = require("mongoose");

const chairSchema = new mongoose.Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "course",
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("chairs", chairSchema);
