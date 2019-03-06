const Router = require('koa-router');
const router = new Router();
const file = require('./file');

router.get('/:path+', file());

module.exports = router.routes();
