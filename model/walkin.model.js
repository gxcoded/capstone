const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walkInSchema = new Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  addedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  username: {
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
  role: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "roles",
    trim: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "genders",
    required: true,
    trim: true,
  },
  vaxStats: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "vaxstatuses",
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  purpose: {
    type: String,
    trim: true,
  },
  dateAdded: {
    type: String,
    trim: true,
    default: Date.now().toString(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
  allowed: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("walkins", walkInSchema);
