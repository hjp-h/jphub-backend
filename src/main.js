const app = require('./app/index')
// 加载数据库
require('./app/database')

const {APP_PORT} = require('./app/config')

// 启动服务器
app.listen(APP_PORT,() => {
  console.log('服务器启动成功！')
})
