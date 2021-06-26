const { verify } = require('jsonwebtoken');
const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  removeLabels,
  getPictureInfo
} = require('../controller/moment.controller.js');
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');
const {
  verifyLabelExists
} = require('../middleware/label.middleware');

momentRouter.post('/create', verifyAuth, create);

momentRouter.get('/list', list);
momentRouter.get('/info/:momentId', detail);

// 1.用户必须登录 2.用户具备权限
momentRouter.patch('/update/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/delete/:momentId', verifyAuth, verifyPermission, remove);

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels);

// 给动态删除标签
momentRouter.delete('/:momentId/remove', verifyAuth, verifyPermission, removeLabels);

// 查看动态的某一张图片
momentRouter.get('/images/:fileName', getPictureInfo)
module.exports = momentRouter;
