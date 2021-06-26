const path = require('path');
const nanoid = require('nanoid');
const Multer = require('koa-multer');
const jimp = require('jimp');
const { PICTURE_PATH } = require('../constants/file-path');
// 配置文件上传
const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PICTURE_PATH)
  },
  filename: (req, file, cb) => {
    cb(null, nanoid.nanoid() + '_' + (file.originalname.split('.')[0]) + path.extname(file.originalname))
  }
})
const pictureUpload = Multer({
  storage
})

const pictureHandler = pictureUpload.array('picture', 9);

// 压缩图片
const pictureResize = async (ctx,next) => {
  // 获取到上传的文件数组
  const files = ctx.req.files;
  // 遍历数组写入文件夹
  for(let file of files) {
    console.log(file);
    const destPath = path.join(file.destination,file.filename);
    console.log(destPath);
    jimp.read(file.path).then(image => {
      image.resize(1280,jimp.AUTO).write(`${destPath}-large`);
      image.resize(640,jimp.AUTO).write(`${destPath}-middle`);
      image.resize(320,jimp.AUTO).write(`${destPath}-small`);
    })
  }
  await next();
} 
module.exports = {
  pictureHandler,
  pictureResize
}
