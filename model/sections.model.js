const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  yearLevel: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "yearLevels",
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("sections", sectionSchema);
