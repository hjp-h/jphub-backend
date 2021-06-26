const connection = require('../app/database');

class FileService {
  // 头像信息插入数据库
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `
      INSERT INTO avatar(filename,mimetype,size,user_id) value(?,?,?,?)
    `
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  // 将头像地址插入到用户表
  async updateAvatarByUserId(filePath, userId) {
    const statement = `
      UPDATE user SET avatar_url = ? WHERE id = ?
    `
    const [result] = await connection.execute(statement, [filePath, userId])
    return result
  }

  // 将图片信息插入到file表
  async savePictureInfo(filename, mimetype, size, momentId, userId) {
    const statement = `
      INSERT INTO file(filename,mimetype,size,moment_id,user_id) value(?,?,?,?,?)
    `
    const [result] = await connection.execute(statement, [filename, mimetype, size, momentId, userId])
    return result
  }
}

module.exports = new FileService();
