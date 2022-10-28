const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const iconSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("icons", iconSchema);
