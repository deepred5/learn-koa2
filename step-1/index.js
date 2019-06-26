const Kao = require('./application');
const app = new Kao();

app.use(async (req, res) => {
  res.writeHead(200);
  res.end('hello world');
});

app.listen(3001, () => {
  console.log('server start at 3001');
});