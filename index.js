const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('1-start');
  await next();
  console.log('1-end');
});


app.use(async (ctx, next) => {
  console.log('2-start');
  await next();
  console.log('2-end');
});


app.use(async ctx => {
  console.log('3-start');
  ctx.body = 'Hello World';
  console.log('3-end');
});

app.listen(3000);