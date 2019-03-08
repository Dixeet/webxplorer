const Koa = require('koa');
const consola = require('consola');
const app = new Koa();
const session = require('koa-session');

function start() {
  // Instantiate nuxt.js

  const host = '127.0.0.1';
  const port = 3000;

  app.use(
    session(
      {
        key: 'koa-session',
        maxAge: 'session',
        signed: false,
        rolling: true,
      },
      app,
    ),
  );
  const router = require('./router')();
  app.use(router);

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

start();
