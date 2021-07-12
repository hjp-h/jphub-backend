const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid');
const Multer = require('koa-multer');
const jimp = require('jimp');
const { PICTURE_PATH,BACKGROUND_PATH } = require('../constants/file-path');
const userService = require('../service/user.service');
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
// 上传背景之前删除之前的那张背景图片
const delPreBackground = async(ctx,next) => {
  // 获取用户的id
  const userId = ctx.user.id;
  // 根据用户id获取背景图片信息
  const result = await userService.getBackgroundImageByUserId(userId);
  console.log('result',result)
  if(result) {
    const { filename } = result;
    // 获取文件的路径
    const filePath = BACKGROUND_PATH + filename;
    // 删除之前的图片
    fs.unlinkSync(filePath);
  }
  await next(); 
}

module.exports = {
  pictureHandler,
  pictureResize,
  delPreBackground
}
