# node-vue-moba
> node.js+vue.js 全栈开发手机端官网和管理后台

## 一、入门

### 1.项目介绍

### 2.工具安装和环境搭建(nodejs,npm,VUE CLI,mongodb,nodemon)

#### 安装git

- 官网 https://git-scm.com/downloads 下载最新版

##### 设置proxy（代理）

###### 设置当前代理
```sh
$ git config http.proxy http://127.0.0.1:2334
```

###### 取消当前代理
```sh
$ git config --unset http.proxy
```

###### 取消全局代理
```sh
$ git config --global --unset http.proxy
```

###### 设置socks5代理
```sh
$ git config http.proxy socks5://127.0.0.1:10809
```

#### 安装nodejs 

- 官网 http://nodejs.cn/ 下载最新版

##### npm 的淘宝镜像

###### 查看原本镜像

```sh
$ npm config registry //https://registry.npmjs.org
```

###### 设置成淘宝镜像

- 临时

  ```sh
  $ npm --registry https://registry.npm.taobao.org
  ```

- 永久

  ```sh
  $ npm config set registry https://registry.npm.taobao.org
  ```

- 配置后验证是否成功

  ```sh
  $ npm config get registry
  ```

  或

  ```sh
  $ npm info
  ```

- 恢复npm原镜像

  ```sh
  $ npm config set registry https://registry.npmjs.org
  ```

#### 安装VUE CLI

```sh
$ npm install -g @vue/cli
```

#### 安装mongodb

- 下载地址https://www.mongodb.com/try/download/community 下载最新版

#### 安装nodemon

```sh
$ npm i -g nodemon
```

#### vscode 安装

### 3.初始化项目

#### 新建server文件夹

>表示服务端项目，nodejs 所有的东西，包括给后台管理admin界面和前台web界面提供接口

```sh
$ mkdir server
```

#### 创建web端的项目

```sh
$ vue create web
```

>选择 默认 安装

#### 创建后台管理界面项目

```sh
$ vue create admin
```

> 选择 默认 安装

##### 初始化后台的服务端 server

###### 进入server 文件夹

```sh
$ cd server
```

###### 初始化 node 项目

> 会生成 package.json

```sh
$ npm init -y
```

###### 新建入口文件 index.js

- 自定义脚本运行文件

  > 在package.json 里面 的 scripts中新建

  ```json
  "scripts": {
    "serve": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ```

----------

## 二、管理后台

### 1.基于Element UI后台管理基础界面搭建

#### 进入到后台admin文件夹

```sh
$ cd admin
```

#### 安装 Element UI 的插件

```sh
$ vue add element
```

>安装 提示全按 回车 即可

#### 安装路由

```sh
$ vue add router
```

>这里没有使用 history 的路由方式

#### 创建首页 以及 配置路由

### 2.创建分类(多层级)

#### 客户端

##### 提交数据需安装 axios 

```sh
$ npm i axios
```

##### 使用 axios 

###### 创建文件引用

###### 在main.js 中加入到原型中，在整个项目中用this来进行使用

#### 服务端

##### 安装express下一版本，mongoose,cors,

```sh
$ npm i express@next mongoose cors
```

>这里express安装下一版本5.0 
>
>因为后面用 http-assert 必须要求 5.0，否则不支持async的异常处理

### 3.分类列表

### 4.修改分类

### 5.删除分类

### 6.子分类

>逻辑上是父子级 的关系，实际在数据库中还是 扁平 的数据，都是平级的
>
>只不过用一个 字段 表示 其对应关系，从而形成一个链式结构，就可实现无线层级的分类

#### 服务端

##### 在 models（创建的模型）下新增`parent` 字段

###### ~~普通写法-----> 错误~~

```js
parent: { type: String },
```

###### 正确写法

>/**
>
>  \* parent: { type: String },
>
>  \* 
>
>  \* 这里一定不是 String 类型，一定是特殊类型
>
>  \* 
>
>  \* ref 表示关联的模型
>
>  */

```js
parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
```

- 在 router (路由)下更改`新增列表`接口

  ~~const items = await Category.find().limit(10)~~

  ```js
    router.get('/categories', async (req, res) => {
      // 显示新增列表
      // const items = await Category.find().limit(10)
      const items = await Category.find().populate('parent').limit(10)
      /**
       * populate 表示关联字段 取出/查出
       * 把 那个关联字段的 相关数据 展示出来
       */
      res.send(items)
    })
  ```

### 7.通用CRUD接口(服务端)

>CRUD 是crate(增)、read(查)、update(改)、delete(删)的缩写
>
>简而言之 就是增删改查的一个公用写法接口抽离出来

#### 更改成动态路由

~~app.use('/admin/api/', router)~~

```js
// app.use('/admin/api/', router) //匹配 /admin/api 开头的路由
app.use('/admin/api/rest/:resource', router) //通用接口
```

>记得在客户端调取接口的时候 + /rest

#### 转类名的包

>专门用来处理  单复数的转换、下划线、单词的格式转换

```sh
$ npm i inflection
```

##### 使用

```js
require('inflection').classify(req.params.resource)
```

####  app.use 中添加中间键

```js
app.use('/admin/api/rest/:resource', async (req, res, next) => {
  const modelName = require('inflection').classify(req.params.resource)
  req.Mondel = require(`../../models/${modelName}`)

  next()
}, router) //通用接口
```

#### 修改 关联字段

~~const items = await req.Mondel.find().populate('parent').limit(10)~~

```js
const queryOptions = {}
if (req.Mondel.modelName === 'Category') {
  queryOptions.populate = 'parent'
}
const items = await req.Mondel.find().setOptions(queryOptions).limit(10)
```

### 8.装备管理

### 9.图片上传（multer）和文件管理

#### 封装的axios取baseURL

```js
$http.defaults.baseUrl
```

#### 处理上传文件的包

```sh
$ npm i multer
```

##### 使用

```js
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
   */
  dest: __dirname + '/../../uploads'
})
// 有了上传中间键req 上才会有file
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file
  res.send(file)
}) // 上传文件接口，不使用路由
```

#### 静态文件管理

##### 服务端

###### index.js

```js
/**
 * 静态文件托管 express.static
 */
app.use('/uploads', express.static(__dirname + '/uploads'))
```

###### router\admin\index.js

```js
// 有了上传中间键req 上才会有file
app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
  const file = req.file
  /**
   * 需要定义静态路由来访问静态文件进行文件托管
   */
  file.url = `http://localhost:3000/uploads/${file.filename}`
  res.send(file)
}) // 上传文件接口，不使用路由
```

##### 客户端

###### src/views/item/itemEdit.Vue

- ~~普通写法~~

  ```vue
  this.model.icon = res.url
  ```

- 正确写法

  >   /**
  >
  >​    \* 当给对象加属性时,console.log 可以打印出来，但是没有更新到视图上
  >
  >​    \* 
  >
  >​    \* this.$set(target, key, value) 方法 -----> 响应式对象
  >
  >​    \* 要更改的数据源(可以是对象或者数组)，要更改的具体数据，重新赋的值
  >
  >​    */

  ```js
  this.$set(this.model, 'icon', res.url)
  ```


### 10.英雄管理

### 11.编辑英雄

#### 浅拷贝和深拷贝

- ##### 简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。

  >   /**
  >
  >​    \* 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
  >
  >​    \* Object.assign(target, source1,source2)
  >
  >​    \* 第一个参数是目标对象，后面的参数都是源对象
  >
  >​    */

  ```js
  this.model = Object.assign({}, this.model, res.data)
  ```

### 12.装备的多选

### 13.技能的编辑

### 14.文章管理

### 15.富文本编辑器(quill)

### 16.首页广告管理

### 17.管理员账号管理(bcrypt)

### 18.登录接口

### 19.登录接口(jwt,jsonwebtoken)

### 20.服务端登录校验

### 21.客户端路由限制(beforeEach,meta)

-------

## 三、移动端网站

### 1.开发服务端接口

### 2.考虑整体样式

### 3.使用字体图标(iconfont)

### 4.首页顶部轮播图(swiper)

### 5.考虑通用组件(SFC)

### 6.卡片组件

### 7.菜单组件

### 8.首页新闻资讯

### 9.新闻详情页

### 10.首页英雄列表

### 11.英雄详情页

--------

## 四、发布和部署(阿里云)

### 1.生产环境编译

### 2.购买域名和服务器

### 3.域名解析

### 4.Nginx 安装和配置

### 5.MongoDB数据库的安装和配置

### 6.git 安装、配置ssh-key

### 7.Node.js安装、配置淘宝路径

### 8.拉去代码，安装pm2并启动项目

### 9.配置Nginx 的反向代理

-------

## 五、进阶

### 1.使用免费SSL证书启用HTTPS安全连接

### 2.使用阿里云OSS云存储存放上传文件

