const mongoose = require('mongoose')
const Schema = mongoose.Schema

const queueSchema = new Schema({
     number: {
        type: Number,
     }
})

module.exports = mongoose.model('queue',queueSchema)