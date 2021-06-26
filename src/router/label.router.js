const Router = require('koa-router');

const {
  verifyAuth
} = require('../middleware/auth.middleware');
const {
  create,
  list
} = require('../controller/label.controller.js')

const labelRouter = new Router({prefix: '/label'});

labelRouter.post('/create', verifyAuth, create);
labelRouter.get('/list', list);

module.exports = labelRouter;
