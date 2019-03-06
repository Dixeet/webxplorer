const Router = require('koa-router');
const router = new Router();
const file = require('./file');
const zip = require('./zip');

router.get('/file/:file+', file());
router.get('/zip/:path+', zip());

module.exports = router.routes();
