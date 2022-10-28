const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yearLevelSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("yearLevels", yearLevelSchema);
