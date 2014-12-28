var koa = require('koa')
  , router = require('koa-router')
  , app = koa();

// mount the middleware
app.use(router(app));

app.listen(3000);
