'use strict';

/**
 * Module dependencies.
 */
var bodyParser = require('koa-bodyparser');
var config = require('./config');
var favicon = require('koa-favicon');
var fs = require('fs');
var http = require('http');
var koa = require('koa');
var logger = require('koa-logger');
var mongoose = require('mongoose');
var path = require('path');
var render = require('koa-ejs');
var routes = require('./routes/');
var staticServer = require('koa-static');
var validate = require('koa-validate');

var app = koa();

/**
 * connect to mongodb
 */
// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect('mongodb://localhost/grbitcoin_db', options);
};
connect();

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

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
 * validate
 */
app.use(validate());

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
