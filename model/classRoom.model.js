const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classRoomSchema = new Schema({
  classId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "classes",
    required: true,
    trim: true,
  },
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("classRooms", classRoomSchema);
