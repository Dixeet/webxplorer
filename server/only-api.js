const Koa = require('koa');
const consola = require('consola');
const app = new Koa();

function start() {
  // Instantiate nuxt.js

  const host = '127.0.0.1';
  const port = 3000;

  const router = require('./router')();
  app.use(router);

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

start();
