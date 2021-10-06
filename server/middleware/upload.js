// 上传中间键
const multer = require('multer')

module.exports = () => {
  return multer({
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
    dest: __dirname + '/../uploads'
  })
}