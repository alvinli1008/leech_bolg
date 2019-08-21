const mongoose = require('mongoose')
const moment = require('moment')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, // false表示查询时不显示返回密码
    set(val) {
      return require('bcrypt').hashSync(val, 10) // bcrypt 散列
    }
  },
  auth: {
    type: Number,
    // enum: [1, 2],
    default: 0
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
   },
  updatedAt: { 
    type: Date, 
    default: Date.now,
   }
},
{
  timestamps: true
}
)

module.exports = mongoose.model('User', schema)
