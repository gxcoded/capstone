const mongoose = require("mongoose");

const positiveSchema = new mongoose.Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  accountOwner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  dateTested: {
    type: String,
    required: true,
    trim: true,
  },
  dateSent: {
    type: String,
    required: true,
    trim: true,
  },
  lastVisit: {
    type: String,
    required: true,
    trim: true,
  },
  imgProof: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  reply: {
    type: String,
    trim: true,
    default: "",
  },
  replyDate: {
    type: String,
    trim: true,
    default: null,
  },
  isStillValid: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("positives", positiveSchema);
