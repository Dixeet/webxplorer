const fs = require('fs-extra');
const services = require('../../../services');

module.exports = function() {
  return async function fileMiddleware(ctx) {
    const headers = await services.getDownloadHeaders({
      path: ctx.params.file
    });
    headers.forEach(header => {
      ctx.set(header.header, header.value);
    });
    ctx.body = fs.createReadStream(
      services.resolve(services.config.get('server:rootDir'), ctx.params.file)
    );
  };
};
