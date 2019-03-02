const Router = require('koa-router');
const services = require('../../../services');
const router = new Router();

function saveConf() {
  return new Promise((resolve, reject) => {
    services.config.save(err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

router.post('/', async ctx => {
  if (ctx.request.body) {
    const keyValues = services.nconfify(ctx.request.body);
    for (const keyValue of keyValues) {
      services.config.set(keyValue[0], keyValue[1]);
    }
    await saveConf();
  }
  ctx.body = {
    message: 'Config saved'
  };
});

module.exports = router.routes();
