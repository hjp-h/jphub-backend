const fs = require('fs');

const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file-path');


class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await userService.create(user);

    // 返回数据
    ctx.body = { ...result, code: 200 };
  }

  // 获取用户头像
  async avatarInfo(ctx, next) {
    // 获取用户id
    const userId = ctx.params.userId;
    // 去数据库中查询该用户id对应的用户头像信息
    const avatar = await userService.getAvatarByUserId(userId);
    const { filename, mimetype } = avatar;
    // 获取文件的路径
    const filePath = AVATAR_PATH + filename;
    // console.log(filePath)
    // 设置响应文件类型 没有设置的话就是直接下载
    ctx.response.set('content-type', mimetype);
    // 响应的是buffer
    ctx.body = fs.createReadStream(filePath);
  }
}

module.exports = new UserController();
