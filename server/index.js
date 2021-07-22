const express = require('express')

const app = express()

// json 格式接收
app.use(express.json())

// 跨域
app.use(require('cors')())

// 配置路由
require('./router/admin')(app, express)

// 引用数据库
require('./plugins/db')(app)

app.listen('3000', () => {
  console.log('http://localhost:3000');
})