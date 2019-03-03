const util = require('util');
const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const services = require('../../../services');

const compare = util.promisify(bcrypt.compare);
const sign = util.promisify(jwt.sign);
const router = new Router();

async function login(ctx) {
  const {
    request: { body }
  } = ctx;
  if (typeof body.password === 'undefined') {
    ctx.throw(400, '"password" field required');
  }
  const res = await compare(
    body.password,
    services.config.get('server:auth:password')
  );
  if (!res) {
    ctx.throw(401, 'Password does not match');
  }
  ctx.body = {
    token: await sign(
      { iat: Math.floor(Date.now() / 1000) },
      services.config.get('server:auth:jwt-secret'),
      { expiresIn: '2h' }
    )
  };
}

router.post('/login', login);

module.exports = router.routes();
