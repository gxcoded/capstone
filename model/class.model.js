const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "course",
    required: true,
    trim: true,
  },
  semester: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "semesters",
    required: true,
    trim: true,
  },
  yearLevel: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "yearLevels",
    required: true,
    trim: true,
  },
  section: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "subjects",
    required: true,
    trim: true,
  },
  defaultTimeStart: {
    type: String,
    required: true,
    trim: true,
  },
  defaultRoom: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "rooms",
    required: true,
    trim: true,
  },
  icon: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "icons",
    required: true,
    trim: true,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("classes", classSchema);
