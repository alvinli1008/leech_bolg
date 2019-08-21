const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String }
})

schema.virtual('count', {
  localField: '_id', // // 本集合中需要查找的字段
  foreignField: 'tags', // // 另外一个集合中需要关联的字段
  justOne: false, // 如果设为 true 或 1，则只删除匹配到的多个文档中的第一个
  ref: 'Article'
})

module.exports = mongoose.model('Tag', schema)
