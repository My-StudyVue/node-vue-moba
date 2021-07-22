module.exports = (app, express) => {
  const router = express.Router() //express 的子路由

  const Category = require('../../models/Category')

  router.post('/categories', async (req, res) => {
    // 创建数据
    const model = await Category.create(req.body)
    res.send(model)
  })

  app.use('/admin/api/', router) //匹配 /admin/api 开头的路由
}