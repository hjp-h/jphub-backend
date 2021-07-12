const path = require('path');
const Multer = require('koa-multer');
const {BACKGROUND_PATH} = require('../constants/file-path')
const nanoid = require('nanoid')
// 配置存储位置storage
const storage = Multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null,BACKGROUND_PATH)
  },
  filename:(req, file, cb) => {
    cb(null,nanoid.nanoid() + "_" + file.originalname.split('.')[0] + path.extname(file.originalname))
  }
})
// 创建Multer实例
const backgroundImgUpload = Multer({
  storage
})

const backgroundImgHandler = backgroundImgUpload.single('backgroungImage');

module.exports = {
  backgroundImgHandler
}
