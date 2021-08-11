const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  /**
   * parent: { type: String },
   * 
   * 这里一定不是 String 类型，一定是特殊类型
   * 
   * ref 表示关联的模型
   */
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

module.exports = mongoose.model('Category', schema)