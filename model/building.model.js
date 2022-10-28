const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 const buildingSchema = new Schema({
      campus:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'campus',
        required: true,
        trim: true
      },
      description: {
         type: String,
         required: true,
         trim: true
      }
 })

 module.exports = mongoose.model('buildings',buildingSchema)