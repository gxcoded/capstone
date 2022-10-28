const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  classId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "classes",
    required: true,
    trim: true,
  },
  room: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "rooms",
    required: true,
    trim: true,
  },
  date: {
    type: String,
    trim: true,
    default: Date.now().toString(),
  },
  start: {
    type: String,
    trim: true,
    default: Date.now().toString(),
  },
  time: {
    type: String,
    trim: true,
    default: null,
  },
  end: {
    type: String,
    trim: true,
    default: null,
  },
});

module.exports = mongoose.model("meetings", meetingSchema);
