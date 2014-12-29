var koa = require('koa')
  , route = require('./routes/')
  , app = koa();

// mount routes
route(app);

app.listen(3000);
console.log('grbitcoin listening on port 3000');
