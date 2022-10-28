const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  academic: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "academics",
    default: null,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "yearLevels",
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
  courseCode: {
    type: String,
    required: true,
    trim: true,
  },
  courseDescription: {
    type: String,
    required: true,
    trim: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("subjects", subjectSchema);
