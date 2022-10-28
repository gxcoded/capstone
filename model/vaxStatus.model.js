const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 const vaxStatusSchema = new Schema({
      description: {
         type: String,
         required: true,
         trim: true
      }
 })

 module.exports = mongoose.model('vaxstatuses',vaxStatusSchema)