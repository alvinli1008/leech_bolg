const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    articleId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Article' },
    createdAt: { type: Date, default: Date.now, },
    updatedAt: { type: Date,  default: Date.now, },
    replies: []
},
{
  timestamps: true
}
)


module.exports = mongoose.model('Comment', schema)