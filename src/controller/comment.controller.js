const service = require('../service/comment.service.js');

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await service.create(momentId, content, id);
    ctx.body = {...result,code:200};
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await service.reply(momentId, content, id, commentId);
    ctx.body = {...result,code:200};
  }

  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await service.update(commentId, content);
    ctx.body = {...result,code:200};
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await service.remove(commentId);
    ctx.body = {...result,code:200};
  }

  async list(ctx, next) {
    const { momentId } = ctx.params;
    const result = await service.getCommentsByMomentId(momentId);
    ctx.body = {...result,code:200};
  }
}

module.exports = new CommentController();
