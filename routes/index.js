'use strict';

var Router = require('koa-router');
var mount = require('koa-mount');
var api_v1 = require('../controllers/api_v1');
var web = require('../controllers/web');

module.exports = function(app) {
  // api
  var api_v1Router = new Router();

  api_v1Router
    .get('/bitcoin/:email', api_v1.getBitcoinAddress)
    .get('/email/:bitcoin_address', api_v1.getEmail);

  // web
  var webRouter = new Router();

  webRouter
    .get('/', web.index)
    .post('/sendEmail', web.sendEmailIfNeeded),
    .get('/bind/:token_string', web.bind),
    .get('/unbind/:token_string', web.bind);

  // mount middleware
  app.use(mount('/v1', api_v1Router.middleware()))
     .use(mount('/', webRouter.middleware()));
}
