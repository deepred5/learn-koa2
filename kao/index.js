const Kao = require('./application');
const app = new Kao();

app.use(async (ctx) => {
  ctx.body = 'hello tc';
});

app.listen(3001, () => {
  console.log('server start at 3001');
});

