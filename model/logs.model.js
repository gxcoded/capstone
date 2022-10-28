const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  room: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "rooms",
    required: true,
    trim: true,
  },
  scannedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  accountScanned: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    trim: true,
    default: null,
  },
  meeting: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "meetings",
    trim: true,
    default: null,
  },
  date: {
    type: String,
    trim: true,
    default: Date.now().toString(),
  },
  start: {
    type: String,
    trim: true,
    default: Date.now().toString(),
  },
  end: {
    type: String,
    trim: true,
    default: null,
  },
  isVisitor: {
    type: Boolean,
    default: false,
  },
  isSitIn: {
    type: Boolean,
    default: false,
  },
  duration: {
    hour: Number,
    minutes: Number,
  },
});

module.exports = mongoose.model("logs", logSchema);
