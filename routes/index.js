var router = require('koa-router')
  , mount = require('koa-mount');

module.exports = function(app) {
  // mount middleware
  app.use(router(app));

  // api
  var APIv1 = new Router();

  // web
  var web = new Router();

  web.
}
