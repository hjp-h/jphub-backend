const fs = require('fs');
const path = require('path');
const env = require('dotenv')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/public.key'))
// 调用这个方法 就会把根目录下的env文件的配置放入process中
env.config();
module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY

