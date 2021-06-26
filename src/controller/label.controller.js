const service = require('../service/label.service');

class LabelController {
  async create(ctx, next) {
    const { labelName } = ctx.request.body;
    const result = await service.create(labelName);
    ctx.body = {...result,code:200};
  }

  async list(ctx, next) {
    const { offset,size } = ctx.query;
    const result = await service.getLabels(offset,size);
    ctx.body = {...result,code:200};
  }
}

module.exports = new LabelController();
