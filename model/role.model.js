const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 const roleSchema = new Schema({
      description: {
         type: String,
         required: true,
         trim: true
      }
 })

 module.exports = mongoose.model('roles',roleSchema)