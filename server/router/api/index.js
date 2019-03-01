const Router = require('koa-router');
const router = new Router();
const dir = require('./dir');
const download = require('./download');

router.get('/', ctx => {
  ctx.body = 'API endpoints';
});

router.use('/dir', dir);
router.use('/download', download);

module.exports = router.routes();
