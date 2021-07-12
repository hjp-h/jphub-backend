const Router = require('koa-router');

const authRouter = new Router();

const {
  login,
  success
} = require('../controller/auth.controller');
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware');

authRouter.post('/JPHub/login', verifyLogin, login);
authRouter.get('/testAuth', verifyAuth, success);

module.exports = authRouter;
