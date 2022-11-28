const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restrictedSchema = new Schema({
  caseId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "cases",
    required: true,
    trim: true,
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  stillValid: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("restricted", restrictedSchema);
