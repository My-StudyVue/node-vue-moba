module.exports = (app, express) => {
  // const router = express.Router() //express 的子路由
  const router = express.Router({
    // 在router 里面用到了 app.use 里面的动态参数，则需要加 mergeParams
    mergeParams: true, //表示合并 url参数
  })


  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const authMiddleware = require('../../middleware/auth')
  const uploadMiddleware = require('../../middleware/upload')
  const resourceMiddleware = require('../../middleware/resource')

  const AdminUser = require('../../models/AdminUser')

  // const Category = require('../../models/Category')

  /**
   * 创建资源
   */
  // router.post('/categories', async (req, res) => {
  router.post('/', async (req, res) => {
    // const Mondel = require(`../../models/${req.params.resource}`)
    // 创建数据
    // const model = await Category.create(req.body)
    const model = await req.Mondel.create(req.body)

    res.send(model)
  })

  /**
   * 资源列表
   */
  // router.get('/categories', async (req, res) => {
  router.get('/', async (req, res) => {
    // classify 转类名 小写复数转换成单数的形式
    // const modelName = require('inflection').classify(req.params.resource)
    // const Mondel = require(`../../models/${modelName}`)
    // 放中间键里

    // 显示新增列表
    // const items = await Category.find().limit(100)
    // const items = await Mondel.find().populate('parent').limit(100)
    const queryOptions = {}
    if (req.Mondel.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Mondel.find().setOptions(queryOptions).limit(100)

    /**
     * populate 表示关联字段 取出/查出
     * 把 那个关联字段的 相关数据 展示出来
     */
    res.send(items)
  })

  /**
   * 资源详情
   */
  // router.get('/categories/:id', async (req, res) => {
  router.get('/:id', async (req, res) => {
    // 列表详情
    // const model = await Category.findById(req.params.id)
    const model = await req.Mondel.findById(req.params.id)

    res.send(model)
  })

  /**
   * 修改（更新）资源
   */
  // router.put('/categories/:id', async (req, res) => {
  router.put('/:id', async (req, res) => {
    // 列表更新/修改
    // const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    const model = await req.Mondel.findByIdAndUpdate(req.params.id, req.body)

    res.send(model)
  })

  /**
   * 删除资源
   */
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
  // app.use('/admin/api/rest/:resource', async (req, res, next) => {
  // 再加一个登陆授权的中间键
  app.use('/admin/api/rest/:resource', authMiddleware(assert, jwt, AdminUser), resourceMiddleware(), router) //通用接口


  // 有了上传中间键req 上才会有file
  // app.post('/admin/api/upload', uploadMiddleware().single('file'), async (req, res) => {
  // 再加一个登陆授权的中间键
  app.post('/admin/api/upload', authMiddleware(assert, jwt, AdminUser), uploadMiddleware().single('file'), async (req, res) => {
    const file = req.file
    /**
     * 需要定义静态路由来访问静态文件进行文件托管
     */
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  }) // 上传文件接口，不使用路由



  //登陆接口
  app.post('/admin/api/login', async (req, res) => {
    const { userName, password } = req.body
    /**
     * 1.根据用户名寻找用户
     * 
     * 引入用户登陆模型
     * 寻找一条与输入用户名匹配的数据
     * 判断用户是否存在
     */
    // const user = await AdminUser.findOne({ userName })
    // select('+password')表示 select: false的可以被取出来
    const user = await AdminUser.findOne({ userName }).select('+password')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    //使用http-assert
    assert(user, 422, '用户不存在')


    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    //使用http-assert
    assert(isValid, 422, '密码错误')


    // 3.返回token
    /**
     * sign(payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options?: jwt.SignOptions): string
     * 
     * payload 承载的数据，secretOrPrivateKey 密钥 ---> 全局的
     */
    const token = jwt.sign({
      id: user._id,
      // userName: user.userName, //一般大多数不需要用户名
    }, app.get('secret'))
    res.send({ token })
  })


  // 错误处理函数 ---> 捕获到异常
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}