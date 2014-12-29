var Router = require('koa-router')
  , mount = require('koa-mount')
  , api_v1 = require('../controllers/api_v1.js')
  , web = require('../controllers/web.js');

module.exports = function(app) {
  // api
  var api_v1Router = new Router();

  api_v1Router
    .get('/bitcoin/:email_hash', api_v1.getBitcoinAddress);

  // web
  var webRouter = new Router();

  webRouter
    .get('/', web.root);

  // mount middleware
  app.use(mount('/v1', api_v1Router.middleware()))
     .use(mount('/', webRouter.middleware()));
}
