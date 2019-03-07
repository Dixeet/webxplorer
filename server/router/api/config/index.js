const Router = require('koa-router');
const Dot = require('dot-object');
const services = require('../../../services');
const router = new Router();
const dot = new Dot(':');

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

const mask = {
  'server:rootDir': services.config.get('server:rootDir'),
  'server:apiBaseUrl': services.config.get('server:apiBaseUrl'),
  'server:auth:enable': services.config.get('server:auth:enable'),
  'server:auth:jwt-secret': services.config.get('server:auth:jwt-secret'),
  'server:auth:tokenExpires': services.config.get('server:auth:tokenExpires'),
};

async function postConfig(ctx) {
  if (ctx.request.body) {
    const dottedObject = dot.dot(ctx.request.body);
    for (const key in dottedObject) {
      if (Object.keys(mask).indexOf(key) > -1) {
        services.config.set(key, dottedObject[key]);
      } else if (key === 'server:auth:password') {
        // Todo Handle password
        console.log('password', dottedObject[key]);
      }
    }
    await saveConf();
  }
  ctx.body = {
    message: 'Config saved',
  };
}

function getConfig(ctx) {
  ctx.body = dot.object(mask);
}

router.post('/', postConfig);
router.get('/', getConfig);

module.exports = router.routes();
