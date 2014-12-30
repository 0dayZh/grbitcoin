var koa = require('koa');
var route = require('./routes/');
var middlewaires = require('koa-middlewares');
var app = koa();

// mount routes
route(app);

app.listen(3000);
console.log('grbitcoin listening on port 3000');
