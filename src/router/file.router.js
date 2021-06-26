const Router = require('koa-router');

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');
const {
  pictureHandler,
  pictureResize
} = require('../middleware/file.middleware');
const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller');

const { avatarHandler } = require('../middleware/user.middleware')
const fileRouter = new Router({ prefix: '/upload' });
// 用户头像上传
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);
// 上传动态图片
fileRouter.post('/pictures/:momentId', verifyAuth, verifyPermission, pictureHandler, pictureResize, savePictureInfo)
module.exports = fileRouter;
