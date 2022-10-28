const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  addedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    trim: true,
    default: null,
  },
  password: {
    type: String,
    trim: true,
    default: null,
  },
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  purpose: {
    type: String,
    trim: true,
    default: null,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "course",
    trim: true,
  },
  department: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "departments",
    trim: true,
    default: null,
  },
  office: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "offices",
    trim: true,
    default: null,
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
  dateAdded: {
    type: String,
    trim: true,
    default: Date.now().toString(),
  },
  verified: {
    type: Boolean,
    default: true,
  },
  allowed: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("accounts", accountSchema);
