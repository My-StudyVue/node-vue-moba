module.exports = (app, express) => {
  const router = express.Router({})

  // 引用模型
  // const Article = require('../../models/Article')
  // const Category = require('../../models/Category')
  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  // 只用于 最初录入新闻列表数据
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ['QQ×王者荣耀6周年庆专场“峡谷游园会”开启！', '狄某有话说 |花木兰：你抓任你抓，我就在塔下！', '大神周年齐聚，解锁峡谷奥秘', '狄某有话说 |安琪拉：中路危险，草丛给我安全感', '王者荣耀×完美日记 峡谷四美眼影系列新品来啦', '11月2日体验服停机更新公告', '11月1日全服不停机更新公告', '10月30日登录匹配异常说明', '10月30日游戏内电视台直播奖励领取异常说明', '10月30日游戏内电视台直播异常说明', '桂花浮玉秋景无限，峡谷福利喜连连', '【蔷薇珍宝阁】活动开启公告', '周年祈愿-登录送永久开启公告及FAQ', '双倍返利活动开启公告', '“2021共创之夜”如期而至，第五波福利来袭，欢迎来到《王者荣耀》！', '虎牙HMA手游电竞大赛小组赛全面收官，晋级名额出炉！', '小组排位初露锋芒，大神杯正式进入全国大赛名额角逐战', '看全国大赛省赛直播，为家乡打call助阵!', 'KPL预报丨成都AG迎战MTG，谁能暂时稳住S组？', 'KPL预报丨外卖兄弟再相遇，武汉ES能否八连胜锁定季后赛？']
    const newsList = newsTitles.map(title => {
      //cats.slice(0) 相当于复制了一个数组
      //sort 只要返回结果大雨0，就会交换位置
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title
      }
    })

    // 清空数据库 
    //deleteMany 传递空对象表示 以任意条件查询 去删除
    await Article.deleteMany({})
    // 插入数据
    await Article.insertMany(newsList)
    res.send(newsList)
  })


  //新闻列表接口
  router.get('/news/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: '新闻分类'
    // }).populate({
    //   /**
    //    * populate 关联
    //    * 
    //    * path 需要关联的子分类
    //    * 
    //    * <弊端: populate不能控制chilren下面的每一个newList下显示很多条，只能控制chilren 下面的总数>
    //    */
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    // //lean 属性 转换为JS Object格式

    /**
     * 聚合查询 aggregate
     * 
     * 聚合查询里面的查询叫 聚合管道
     */
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },// 查询到相关数据 需要关联主表id
      {
        $lookup: { //外链接
          from: 'articles',// 关联的表的集合
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList',// 取名
        }
      },// 达到populate 嵌套的效果
      {
        /**
         * addFields 本意添加字段，
         *           也可用来修改字段
         */
        $addFields: {
          newsList: {
            $slice: ['$newsList', 5], // 需要筛选的字段 和 筛选的个数
          },
        }
      }
    ])
    // { $match: { parent: parent._id } } 写法也可以写成where 条件查询形式
    // const cats = await Category.find().where({
    //   parent: parent
    // }).lean()

    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats } //$in表示 筛选出字段值等于制定数组中的所有值
      }).populate('categories').limit(5).lean()
    })//unshift 往当前增加数据

    cats.forEach(cat => {
      cat.newsList.forEach(news => {
        news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
      })
    })

    res.send(cats)
  })


  //导入影响数据

  app.use('/web/api', router)
}