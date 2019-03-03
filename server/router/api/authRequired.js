const services = require('../../services');

module.exports = function() {
  return async function authRequiredMiddleware(ctx, next) {
    const authEnable = services.config.get('server:auth:enable');
    if (authEnable && !ctx.state.jwtdata) {
      ctx.throw(401, 'Authentication Error');
    }
    await next();
  };
};
