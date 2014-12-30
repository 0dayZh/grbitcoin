'use strict';

/**
 * Module dependencies.
 */
var koa = require('koa');
var routes = require('./routes/');
var middlewares = require('koa-middlewares');
var render = middlewares.ejs;
var config = require('./config');
var path = require('path');
var http = require('http');

var app = koa();

/**
 * ignore favicon
 */
app.use(middlewares.favicon());

/**
 * static file server
 */
app.use(middlewares.staticCache(path.join(__dirname, 'public/images'), {
  buffer: !config.debug,
  maxAge: config.debug ? 0 : 60 * 60 * 24 * 7
}));
app.use(middlewares.bodyParser());

if (config.debug && process.env.NODE_ENV !== 'test') {
  app.use(middlewares.logger());
}

/**
 * render
 */
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: config.debug
});

/**
 * router
 */
app.use(middlewares.router(app));
routes(app);

app = module.exports = http.createServer(app.callback());

if (!module.parent) {
  app.listen(config.port);
  console.log('$ open http://127.0.0.1:' + config.port);
}
