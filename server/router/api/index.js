const Router = require('koa-router');
const router = new Router();
const dir = require('./dir');
const download = require('./download');
const configRoute = require('./config');
const auth = require('./auth');
const authRequired = require('./authRequired');
const file = require('./file');

router.get('/', ctx => {
  ctx.body = 'API endpoints';
});

router.use('/dir', authRequired(), dir);
router.use('/download', authRequired(), download);
router.use('/file', authRequired(), file);
router.use('/config', authRequired(), configRoute);
router.use('/auth', auth);

module.exports = router.routes();
