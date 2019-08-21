const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, }
})

schema.virtual('count', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

module.exports = mongoose.model('Category', schema)
