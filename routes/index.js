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
    .post('/sendEmail', web.sendEmailIfNeeded)
    .get('/bind/:token_string', web.bindEmail)
    .post('/bind', web.bindBitcoinAddress)
    .get('/unbind/:token_string', web.unbindEmail)
    .get('/rebind/:token_string', web.rebindEmail);

  // mount middleware
  app.use(mount('/v1', api_v1Router.middleware()))
     .use(mount('/', webRouter.middleware()));

  app.use(function *pageNotFound(next){
   yield next;

   if (404 != this.status) return;

   // we need to explicitly set 404 here
   // so that koa doesn't assign 200 on body=
   this.status = 404;

   switch (this.accepts('html', 'json')) {
     case 'html':
       this.type = 'html';
       this.body = '<p>Page Not Found</p>';
       break;
     case 'json':
       this.body = {
         message: 'Page Not Found'
       };
       break
     default:
       this.type = 'text';
       this.body = 'Page Not Found';
   }
  });
}
