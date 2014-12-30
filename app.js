/**
 * Module dependencies.
 */

var koa = require('koa');
var route = require('./routes/');
var middlewaires = require('koa-middlewares');
var app = koa();

/**
 * static file server
 */
app.use(middlewares.staticCache(path.join(__dirname, 'public'), {
  buffer: false, //!config.debug,
  maxAge: 0 //config.debug ? 0 : 60 * 60 * 24 * 7
}));
app.use(middlewares.bodyParser());

if (config.debug && process.env.NODE_ENV !== 'test') {
 app.use(middlewares.logger());
}

/**
 * router
 */
route(app);

app.listen(3000);
console.log('grbitcoin listening on port 3000');
