const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  showOrder: { type: Number , default: null },
  createdAt: { type: Date, default: Date.now, },
  updatedAt: { type: Date,  default: Date.now, },
  tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag'}],
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  comments:[{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comments' }],
  }, 
  {
    timestamps: {
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt'
    } 
  }
)

module.exports = mongoose.model('Article', schema)
