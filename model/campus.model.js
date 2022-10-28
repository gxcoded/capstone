const mongoose = require('mongoose')
const Schema = mongoose.Schema

const campusSchema = new Schema({
      campusName : {
        type: String,
        required: true,
        trim: true,
      },
      key : {
        type: String,
        required: true,
        trim: true,
      }
},{
    timestamps: true
})

module.exports = mongoose.model('campus',campusSchema);