const Kao = require('./application');
const app = new Kao();

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    return ctx.body = 'error'
  }
}
)

app.use(async (ctx, next) => {
  console.log('1-start');
  a.c.b = 1;
  await next();
  console.log('1-end');
})

app.use(async (ctx) => {
  console.log('2-start');
  ctx.body = 'hello tc';
  console.log('2-end');
});

app.listen(3001, () => {
  console.log('server start at 3001');
});

app.on('error', (err) => {
  console.log(err.stack);
});
