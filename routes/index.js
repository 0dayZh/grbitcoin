'use strict';

var middlewares = require('koa-middlewares');
var mount = require('koa-mount');
var api_v1 = require('../controllers/api_v1');
var web = require('../controllers/web');

module.exports = function(app) {
  var Router = middlewares.router;

  // api
  var api_v1Router = new Router();

  api_v1Router
    .get('/bitcoin/:email_hash', api_v1.getBitcoinAddress);

  // web
  var webRouter = new Router();

  webRouter
    .get('/', web.index);

  // mount middleware
  app.use(mount('/v1', api_v1Router.middleware()))
     .use(mount('/', webRouter.middleware()));
}
