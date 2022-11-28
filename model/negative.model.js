const mongoose = require("mongoose");

const negativeSchema = new mongoose.Schema({
  case: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "positives",
    required: true,
    trim: true,
  },
  accountOwner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  testType: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "testtypes",
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
  resultDate: {
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
    default: "",
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
});

module.exports = mongoose.model("negatives", negativeSchema);
