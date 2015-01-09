'use strict';

var Router = require('koa-router');
var mount = require('koa-mount');
var api_v1 = require('../controllers/api_v1');
var web = require('../controllers/web');
var error = require('../error');
var config = require('../config');

module.exports = function(app) {
  // api
  var api_v1Router = new Router();

  api_v1Router
    .get('/bitcoins/:email', api_v1.getBitcoinAddress)
    .get('/emails/:bitcoin_address', api_v1.getEmail);

  // web
  var webRouter = new Router();

  webRouter
    .get('/', web.index)
    .post('/sendEmail', web.sendEmailIfNeeded)
    .get('/bind/:token_string', web.bindEmail)
    .post('/bind', web.bindBitcoinAddress)
    .get('/unbind/:token_string', web.unbindEmail)
    .get('/rebind/:token_string', web.rebindEmail);

  // error handler
  app.use(error());

  // mount middleware
  app.use(mount('/' + config.api_version, api_v1Router.middleware()))
     .use(mount('/', webRouter.middleware()));
}
