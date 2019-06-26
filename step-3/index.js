const Kao = require('./application');
const app = new Kao();

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

app.use(async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    code: 1,
    message: 'ok',
    url: ctx.url
  };
});

app.listen(3001, () => {
  console.log('server start at 3001');
});