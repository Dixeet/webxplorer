const util = require('util');
const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const services = require('../../../services');
const authRequired = require('../authRequired');

const compare = util.promisify(bcrypt.compare);
const sign = util.promisify(jwt.sign);
const router = new Router();

async function login(ctx) {
  const {
    request: { body },
  } = ctx;
  if (typeof body.password === 'undefined') {
    ctx.throw(400, '"password" field required');
  }
  const res = await compare(
    body.password,
    services.config.get('server:auth:password'),
  );
  if (!res) {
    ctx.throw(401, 'Password does not match');
  }
  const date = new Date();
  const token = await sign(
    { iat: Math.floor(date.getTime() / 1000) },
    services.config.get('server:auth:jwt-secret'),
    { expiresIn: services.config.get('server:auth:tokenExpires') },
  );
  ctx.set(
    'Set-Cookie',
    `jwt-token=${token}; Max-Age=${services.config.get(
      'server:auth:tokenExpires',
    )}; Path=/`,
  );
  ctx.body = {
    token: token,
  };
}

async function renew(ctx) {
  const date = new Date();
  const token = await sign(
    { iat: Math.floor(date.getTime() / 1000) },
    services.config.get('server:auth:jwt-secret'),
    { expiresIn: services.config.get('server:auth:tokenExpires') },
  );
  ctx.set(
    'Set-Cookie',
    `jwt-token=${token}; Max-Age=${services.config.get(
      'server:auth:tokenExpires',
    )}; Path=/`,
  );
  ctx.body = {
    token: token,
  };
}

router.post('/login', login);
router.get('/renew', authRequired(), renew);

module.exports = router.routes();
