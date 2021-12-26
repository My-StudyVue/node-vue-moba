const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  body: { type: String },
}, {
  // 创建时间或者更新时间 ----> 时间戳
  // createTime updateTime
  timestamps: true
})

module.exports = mongoose.model('Article', schema)
// module.exports = mongoose.model('Article', schema,collection:'集合名字,默认是集合名字小写加s')