module.exports = (app, express) => {
  // const router = express.Router() //express 的子路由
  const router = express.Router({
    // 在router 里面用到了 app.use 里面的动态参数，则需要加 mergeParams
    mergeParams: true, //表示合并 url参数
  })


  // const Category = require('../../models/Category')

  // router.post('/categories', async (req, res) => {
  router.post('/', async (req, res) => {
    // const Mondel = require(`../../models/${req.params.resource}`)
    // 创建数据
    // const model = await Category.create(req.body)
    const model = await req.Mondel.create(req.body)

    res.send(model)
  })

  // router.get('/categories', async (req, res) => {
  router.get('/', async (req, res) => {
    // classify 转类名 小写复数转换成单数的形式
    // const modelName = require('inflection').classify(req.params.resource)
    // const Mondel = require(`../../models/${modelName}`)
    // 放中间键里

    // 显示新增列表
    // const items = await Category.find().limit(10)
    // const items = await Mondel.find().populate('parent').limit(10)
    const queryOptions = {}
    if (req.Mondel.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Mondel.find().setOptions(queryOptions).limit(10)

    /**
     * populate 表示关联字段 取出/查出
     * 把 那个关联字段的 相关数据 展示出来
     */
    res.send(items)
  })

  // router.get('/categories/:id', async (req, res) => {
  router.get('/:id', async (req, res) => {
    // 列表详情
    // const model = await Category.findById(req.params.id)
    const model = await req.Mondel.findById(req.params.id)

    res.send(model)
  })

  // router.put('/categories/:id', async (req, res) => {
  router.put('/:id', async (req, res) => {
    // 列表更新/修改
    // const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    const model = await req.Mondel.findByIdAndUpdate(req.params.id, req.body)

    res.send(model)
  })

  // router.delete('/categories/:id', async (req, res) => {
  router.delete('/:id', async (req, res) => {
    // 列表删除
    // await Category.findByIdAndRemove(req.params.id)
    await req.Mondel.findByIdAndRemove(req.params.id)

    res.send({
      Status: 200,
    })
  })

  // app.use('/admin/api/', router) //匹配 /admin/api 开头的路由
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Mondel = require(`../../models/${modelName}`)

    next()
  }, router) //通用接口


  const multer = require('multer')
  // 上传中间键
  const upload = multer({
    /**
     * dest 目标地址在哪里 
     * 
     * __dirname 绝对地址 （必须加）
     * 
     * upload.single() 表示单个文件的上传
     * 
     * file 表示 传入的参数字段（Form Data 里的）
     * 
     */
    dest: __dirname + '/../../uploads'
  })
  // 有了上传中间键req 上才会有file
  app.post('/admin/api/rest/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    res.send(file)
  }) // 上传文件接口，不使用路由
}