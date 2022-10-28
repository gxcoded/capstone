const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tempSchema = new Schema({
  tempId: {
    type: String,
    required: true,
    trim: true,
  },
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "course",
    trim: true,
  },
  role: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "roles",
    trim: true,
    required: true,
  },
  idNumber: {
    type: String,
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
  verificationCode: {
    type: String,
    trim: true,
  },
  purpose: {
    type: String,
    trim: true,
  },
  dateAdded: {
    type: Date,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("temp", tempSchema);
