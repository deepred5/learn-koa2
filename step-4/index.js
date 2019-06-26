const Kao = require('./application');
const app = new Kao();

// 捕获全局异常的中间件
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = 500;
    return ctx.body = 'error'
  }
}
)

app.use(async (ctx, next) => {
  console.log('1-start');
  // 报错可以默认捕获 ctx.onerror
  // 如果使用了捕获全局异常的中间件，则报错在改中间件被捕获，而不会进入默认的ctx.onerror
  deepred.age = 25;
  await next();
  console.log('1-end');
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

// 监听error事件
app.on('error', (err) => {
  console.log(err.stack);
});