const mongoose = require("mongoose");

const personalLogSchema = new mongoose.Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  locationId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "rooms",
    required: true,
    trim: true,
  },
  // scannedBy: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "accounts",
  //   default: null,
  // },
  accountOwner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  date: {
    type: String,
    trim: true,
    default: Date.now().toString(),
  },
  timeIn: {
    type: String,
    trim: true,
    default: Date.now().toString(),
  },
  timeOut: {
    type: String,
    trim: true,
    default: null,
  },
  duration: {
    hour: Number,
    minutes: Number,
  },
});

module.exports = mongoose.model("personalLogs", personalLogSchema);
