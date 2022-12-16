const mongoose = require("mongoose");

const excuseSchema = new mongoose.Schema({
  classRoom: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "classRooms",
    required: true,
    trim: true,
  },
  meeting: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "meetings",
    required: true,
    trim: true,
  },
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  remarks: {
    type: String,
    default: null,
    trim: true,
  },
});

module.exports = mongoose.model("excuses", excuseSchema);
