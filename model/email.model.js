const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    default: null,
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    default: null,
  },
  hash: {
    type: String,
    required: true,
    trim: true,
  },
  idNumber: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  sent: {
    type: Boolean,
    default: true,
  },
  dateSent: {
    type: String,
  },
});

module.exports = mongoose.model("emails", emailSchema);
