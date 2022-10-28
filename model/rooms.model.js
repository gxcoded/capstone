const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  campus: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "campus",
    required: true,
    trim: true,
  },
  // building:{
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'buildings',
  //   required: true,
  //   trim: true
  // },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  allowStudentsAndGuests: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("rooms", roomSchema);
