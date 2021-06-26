const fs = require('fs');
const momentService = require('../service/moment.service');
const { PICTURE_PATH } = require('../constants/file-path')
class MomentController {
  async create(ctx, next) {
    // 1.获取数据(user_id, content)
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 2.将数据插入到数据库
    const result = await momentService.create(userId, content);
    ctx.body = { ...result, code: 200 };
  }

  async detail(ctx, next) {
    // 1.获取数据(momentId)
    const momentId = ctx.params.momentId;

    // 2.根据id去查询这条数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = { ...result, code: 200 };
  }

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query;

    // 2.查询列表
    const result = await momentService.getMomentList(offset, size);
    ctx.body = { ...result, code: 200 };
  }

  async update(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 2.修改内容
    const result = await momentService.update(content, momentId);
    ctx.body = { ...result, code: 200 };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const { momentId } = ctx.params;

    // 2.删除内容
    const result = await momentService.remove(momentId);
    ctx.body = { ...result, code: 200 };
  }

  async addLabels(ctx, next) {
    // 1.获取标签和动态id
    const { labels } = ctx.request.body;
    const { momentId } = ctx.params;

    // 2.添加所有的标签
    for (let label of labels) {
      // 2.1.判断标签是否已经和动态有关系
      const isExist = await momentService.hasLabel(momentId, label.id);
      if (!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = { message: "给动态添加标签成功~", code: 200 };
  }

  // 给动态删除标签
  async removeLabels(ctx, next) {
    console.log(111)
    // 获取要删除标签的动态id
    const momentId = ctx.params.momentId;
    // 获取删除标签列表
    const { delLabelList } = ctx.request.body;
    try {
      for (let labelId of delLabelList) {
        // 调用service进行删除
        await momentService.removeLabel(momentId, labelId)
      }
      ctx.body = { message: '给动态添加标签成功~', code: 200 };
    } catch (error) {
      console.log(error)
      ctx.body = { message: '删除标签失败~', code: 500 };
    }


  }

  // 查看动态的某一张图片信息
  async getPictureInfo(ctx, next) {
    // 获取文件名
    const fileName = ctx.params.fileName;
    // 获取当前的文件路径
    let filePath = PICTURE_PATH + fileName;
    // 获取查看的文件大小的类型
    const type = ctx.query.type;
    console.log('type',type)
    const types = ['small','middle','large']
    // 是否有type 拼接上type 进行展示
    if(types.some(item => item === type)) {
      filePath += "-"+type;
    }
    console.log('filePath',filePath)
    // 根据文件名获取文件的类型
    const result = await momentService.getMimeTypeByFileName(fileName);
    if (result.length) {
      const mimetype = result[0].mimetype;
      // 设置响应的文件类型
      ctx.response.set('content-type', mimetype);
      ctx.body = fs.createReadStream(filePath);
    } else {
      ctx.body = { code: 400, message: "无效的资源地址" }
    }
  }
}

module.exports = new MomentController();
