const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  avatar: { type: String },
  title: { type: String },
  //  做关联类型一定是 mongoose.SchemaTypes.ObjectId
  // category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }, // 这样写表示分类只有一个
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    // 子集
    difficult: { type: Number },
    skill: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      description: { type: String },
      tips: { type: String },
    }
  ],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // gem: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      description: { type: String },
    }
  ],
  whoRestrainted: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      description: { type: String },
    }
  ],
  restraintWho: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      description: { type: String },
    }
  ],
})

module.exports = mongoose.model('Hero', schema)