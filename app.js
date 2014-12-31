'use strict';

/**
 * Module dependencies.
 */
var koa = require('koa');
var routes = require('./routes/');
var render = require('koa-ejs');
var logger = require('koa-logger');
var favicon = require('koa-favicon');
var staticServer = require('koa-static');
var config = require('./config');
var path = require('path');
var http = require('http');
var bodyParser = require('koa-body-parser');

var app = koa();

/**
 * ignore favicon
 */
app.use(favicon());

/**
 * static file server
 */
app.use(staticServer(path.join(__dirname, '/public')));

/**
 * logger
 */
if (config.debug && process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

/**
 * body parser
 */
app.use(bodyParser());

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
routes(app);

app = module.exports = http.createServer(app.callback());

if (!module.parent) {
  app.listen(config.port);
  console.log('$ open http://127.0.0.1:' + config.port);
}
