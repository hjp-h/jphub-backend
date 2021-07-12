const connection = require('../app/database');

class FileService {
  // 头像信息插入数据库
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `
      DELETE FROM avatar WHERE user_id = ?
    `
    await connection.execute(statement, [userId])
    const statement1 = `
      INSERT INTO avatar(filename,mimetype,size,user_id) value(?,?,?,?)
    `
    const [result] = await connection.execute(statement1, [filename, mimetype, size, userId])
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

  // 将图片信息插入到bg_photo表
  async creatBackgroundImg(filename, mimetype, size,userId) {
    const statement = `
      DELETE FROM bg_photo WHERE user_id = ?
    `
    await connection.execute(statement, [userId])
    const statement2 = `
      INSERT INTO bg_photo(filename,mimetype,size,user_id) value(?,?,?,?)
    `
    const [result] = await connection.execute(statement2, [filename, mimetype, size, userId])
    return result
  }

  // 将背景地址插入到用户表
  async updateBackgroundByUserId(filePath, userId) {
    const statement = `
      UPDATE user SET background_url = ? WHERE id = ?
    `
    const [result] = await connection.execute(statement, [filePath, userId])
    return result
  }
}

module.exports = new FileService();
