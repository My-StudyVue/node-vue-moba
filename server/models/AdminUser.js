const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: {
    type: String,
    select: false, // 不能被查询
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
})

module.exports = mongoose.model('AdminUser', schema)