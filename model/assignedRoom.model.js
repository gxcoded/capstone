const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignedRoomSchema = new Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts",
    required: true,
    trim: true,
  },
  room: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "rooms",
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("assignedRooms", assignedRoomSchema);
