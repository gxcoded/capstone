const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 const genderSchema = new Schema({
      description: {
         type: String,
         required: true,
         trim: true
      }
 })

 module.exports = mongoose.model('genders',genderSchema)