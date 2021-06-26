const errorTypes = require('../constants/error-types');

const errorHandler = (error, ctx) => {
  let code, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      code = 400; // Bad Request
      message = "用户名或者密码不能为空~";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      code = 409; // conflict
      message = "用户名已经存在~";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      code = 400; // 参数错误
      message = "用户名不存在~";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      code = 400; // 参数错误
      message = "密码是错误的~";
      break;
    case errorTypes.UNAUTHORIZATION:
      code = 401; // 参数错误
      message = "无效的token~";
      break;
    case errorTypes.UNPERMISSION:
      code = 401; // 参数错误
      message = "您不具备操作的权限~";
      break;
    default:
      code = 404;
      message = "NOT FOUND";
  }
  ctx.status = 200;
  ctx.body = {code,message};
}

module.exports = errorHandler;
