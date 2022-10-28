const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionStatusSchema = new Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  academic: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "academics",
    required: true,
    trim: true,
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
  section: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "sections",
    required: true,
    trim: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("sectionStatus", sectionStatusSchema);
