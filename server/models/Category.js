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

// 子分类关联分类
/**
 * 虚拟字段(virtual)设置
 * 
 * 不会保存到数据库，但是可以根据这个字段查找数据库中的数据
 */
schema.virtual('children', { //定义虚拟字段
  localField: '_id', //内键
  foreignField: 'parent', //外键 主键
  justOne: false, //只查询一条数据
  ref: 'Category' //关联模型
})

// 子分类下的新闻分类
schema.virtual('newsList', {
  localField: '_id', //主表关联从表parentId
  foreignField: 'categories', // 主表id
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema)