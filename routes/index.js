'use strict';

var Router = require('koa-router');
var mount = require('koa-mount');
var api_v1 = require('../controllers/api_v1');
var web = require('../controllers/web');
var error = require('../error');
var config = require('../config');
var limit = require('koa-better-ratelimit');

module.exports = function(app) {
  // RateLimit
  app.use(limit({
    duration: 1000 * 60 * 60 * 1, // 1 hour
    max: 2000   // max to 2000 requests per ip
  }));

  // api
  var api_v1Router = new Router();

  api_v1Router
    .get('/bitcoins/:email', api_v1.getBitcoinAddress)
    .get('/bitcoins', api_v1.getBitcoinAddress422)
    .get('/emails/:bitcoin_address', api_v1.getEmail)
    .get('/emails', api_v1.getEmail422);

  // web
  var webRouter = new Router();

  webRouter
    .get('/', web.index)
    .post('/send_email', web.sendEmailIfNeeded)
    .get('/bind/:token_string', web.bindEmail)
    .post('/bind', web.bindBitcoinAddress)
    .get('/unbind/:token_string', web.unbindEmail)
    .get('/rebind/:token_string', web.rebindEmail)
    .get('/notice/:notice_message', web.notice);

  // error handler
  app.use(error());

  // mount middleware
  app.use(mount('/' + config.api_version, api_v1Router.middleware()))
     .use(mount('/', webRouter.middleware()));
}
