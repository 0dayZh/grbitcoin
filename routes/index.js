var router = require('koa-router')
  , mount = require('koa-mount');

module.exports = function(app) {
  // api
  var APIv1 = new Router();

  APIv1.get('/bitcoin', function *(next) {
    this.body = "GET bitcoin done.";
  });

  // web
  var web = new Router();

  web.get('/', function *(next) {
    this.body = "GET root path done.";
  });

  // mount middleware
  app.use(mount('/v1', APIv1.middleware()));
     .use(mount('/', web.middleware()));
}
