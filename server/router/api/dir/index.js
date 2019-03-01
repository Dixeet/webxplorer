const Router = require('koa-router');
const router = new Router();
const directory = require('./directory');

router.get('/', directory());
router.get('/:path+', directory());

module.exports = router.routes();
