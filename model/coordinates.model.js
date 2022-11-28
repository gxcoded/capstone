const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinatesSchema = new Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  lat: {
    type: String,
    required: true,
    trim: true,
  },
  lng: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("coordinates", coordinatesSchema);
