const Router = require('koa-router');
const router = new Router();
const dir = require('./dir');
const download = require('./download');
const configRoute = require('./config');
const auth = require('./auth');
const authRequired = require('./authRequired');

router.use(authRequired());
router.get('/', ctx => {
  ctx.body = 'API endpoints';
});

router.use('/dir', dir);
router.use('/download', download);
router.use('/config', configRoute);
router.use('/auth', auth);

module.exports = router.routes();
