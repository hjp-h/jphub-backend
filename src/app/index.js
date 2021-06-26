const Koa = require('koa')
const errorHandler = require('./error-handle')
const bodyParser = require('koa-bodyparser')
// 导入用户路由
const useRoutes = require('../router')
// 在app中使用
const app = new Koa()
app.use(bodyParser())
// 将该方法赋值给app.useRoutes
app.useRoutes = useRoutes
// 注册路由
app.useRoutes()
app.on("error",errorHandler)
module.exports = app;
