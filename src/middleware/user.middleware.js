const path = require('path');
const fs = require('fs');
const errorTypes = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle');
const nanoid = require('nanoid');
const Multer = require('koa-multer');
const { AVATAR_PATH } = require('../constants/file-path');

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATAR_PATH)
  },
  filename: (req, file, cb) => {
    cb(null,nanoid.nanoid() + "_" + file.originalname.split('.')[0] + path.extname(file.originalname))
  }
})

const avatarUpload = Multer({
  storage
});

const avatarHandler = avatarUpload.single('avatar');

// 用户登录的中间件
const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名或者密码不能空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 3.判断这次注册的用户名是没有被注册过
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
}

// 对密码进行加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password)

  await next();
}

// 上传头像之前删除之前存储在本地的头像
const delPreAvatar = async(ctx,next) => {
  // 获取用户的id
  const userId = ctx.user.id;
  // 查询头像信息
  // 去数据库中查询该用户id对应的用户头像信息
  const avatar = await service.getAvatarByUserId(userId);
  console.log('avatar',avatar)
  if(avatar) {
    const { filename } = avatar;
    // 获取文件的路径
    const filePath = AVATAR_PATH + filename;
    // 删除之前的图片
    fs.unlinkSync(filePath);
  }
  await next();
}
module.exports = {
  verifyUser,
  handlePassword,
  avatarHandler,
  delPreAvatar
}
