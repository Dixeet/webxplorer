const Router = require('koa-router');

module.exports = function(nuxt) {
  const router = new Router();

  router.get('/api', ctx => {
    ctx.body = 'Yo';
  });

  router.get('*', ctx => {
    // app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
    // });
  });

  return router.routes();
};
