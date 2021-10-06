const express = require('express')

const app = express()

//可放在全局变量环境里
app.set('secret', 'i26rtfx4e456b')

// json 格式接收
app.use(express.json())

// 跨域
app.use(require('cors')())

/**
 * 静态文件托管 express.static
 */
app.use('/uploads', express.static(__dirname + '/uploads'))

// 配置路由
require('./router/admin')(app, express)

// 引用数据库
require('./plugins/db')(app)

app.listen('3000', () => {
  console.log('http://localhost:3000');
})