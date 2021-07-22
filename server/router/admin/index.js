module.exports = (app, express) => {
  const router = express.Router() //express 的子路由

  const Category = require('../../models/Category')

  router.post('/categories', async (req, res) => {
    // 创建数据
    const model = await Category.create(req.body)
    res.send(model)
  })

  router.get('/categories', async (req, res) => {
    // 显示新增列表
    const items = await Category.find().limit(10)
    res.send(items)
  })

  router.get('/categories/:id', async (req, res) => {
    // 列表详情
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  router.put('/categories/:id', async (req, res) => {
    // 列表更新/修改
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/categories/:id', async (req, res) => {
    // 列表删除
    await Category.findByIdAndRemove(req.params.id)
    res.send({
      Status: 200,
    })
  })

  app.use('/admin/api/', router) //匹配 /admin/api 开头的路由
}