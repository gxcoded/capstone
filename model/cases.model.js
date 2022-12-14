const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const caseSchema = new Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  report: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "positives",
    default: null,
  },
  dateTraced: {
    type: String,
    default: null,
    trim: true,
  },
  restrictStart: {
    type: String,
    default: null,
    trim: true,
  },
  restrictEnd: {
    type: String,
    default: null,
    trim: true,
  },
  dateNotified: {
    type: String,
    default: null,
    trim: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("cases", caseSchema);
