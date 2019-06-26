const Kao = require('./application');
const app = new Kao();

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