module.exports = (app, express) => {
  // const router = express.Router() //express 的子路由
  const router = express.Router({
    // 在router 里面用到了 app.use 里面的动态参数，则需要加 mergeParams
    mergeParams: true, //表示合并 url参数
  })


  const jwt = require('jsonwebtoken')

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
  // router.get('/', async (req, res) => {
  //加一个中间键
  router.get('/', async (req, res, next) => {
    /**
     * 校验用户是否登陆
     * 
     * 前端 Authorization 大写 
     * 后端 authorization 小写
     */
    const token = String(req.headers.authorization || '').split(' ').pop()
    /**
     * verify(token: string, secretOrPublicKey: jwt.Secret, options: jwt.VerifyOptions & { complete: true; }): string | jwt.Jwt
     * 
     * 校验方法
     * 
     * decode 只是解密没有校验性
     */
    const { id } = jwt.verify(token, app.get('secret'))
    req.user = await AdminUser.findById(id)
    await next()
  }, async (req, res) => {
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
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
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
    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }


    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }


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
}