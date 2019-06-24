const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application {
  constructor() {
    this.callbackFn = null;
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use(fn) {
    this.callbackFn = fn;
  }

  callback() {
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx)
    };

    return handleRequest;
  }

  handleRequest(ctx) {
    const handleResponse = () => respond(ctx);
    return this.callbackFn(ctx).then(handleResponse);
  }

  createContext(req, res) {
    // 针对每个请求，都要创建ctx对象
    let ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
}

module.exports = Application;

function respond(ctx) {
  let content = ctx.body;
  if (typeof content === 'string') {
    ctx.res.end(content);
  }
  else if (typeof content === 'object') {
    ctx.res.end(JSON.stringify(content));
  }
}