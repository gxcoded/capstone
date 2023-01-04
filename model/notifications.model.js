const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  report: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "positives",
    default: null,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  dateSent: {
    type: String,
    required: true,
    trim: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("notifications", notificationSchema);
