const util = require('util');
const Router = require('koa-router');
const Dot = require('dot-object');
const bcrypt = require('bcrypt');
const services = require('../../../services');
const router = new Router();
const dot = new Dot(':');
const hash = util.promisify(bcrypt.hash);
const saltRounds = 10;

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

function mask() {
  return {
    'server:rootDir': services.config.get('server:rootDir'),
    'server:apiBaseUrl': services.config.get('server:apiBaseUrl'),
    'server:auth:enable': services.config.get('server:auth:enable'),
    'server:auth:jwt-secret': services.config.get('server:auth:jwt-secret'),
    'server:auth:tokenExpires': services.config.get('server:auth:tokenExpires'),
  };
}

async function postConfig(ctx) {
  if (ctx.request.body) {
    const dottedObject = dot.dot(ctx.request.body);
    for (const key in dottedObject) {
      if (Object.keys(mask()).indexOf(key) > -1) {
        services.config.set(key, dottedObject[key]);
      } else if (key === 'server:auth:password') {
        const password = await hash(dottedObject[key], saltRounds);
        services.config.set(key, password);
      }
    }
    await saveConf();
  }
  ctx.body = dot.object(mask());
}

function getConfig(ctx) {
  ctx.body = dot.object(mask());
}

router.post('/', postConfig);
router.get('/', getConfig);

module.exports = router.routes();
