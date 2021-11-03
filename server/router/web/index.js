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

  app.use('/web/api', router)
}