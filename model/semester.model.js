const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("semesters", semesterSchema);
