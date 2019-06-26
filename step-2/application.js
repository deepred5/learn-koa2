const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application {
  constructor() {
    this.callbackFn = null;
    // 每个Kao实例的context request respones
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
    // callbackFn是个async函数，最后返回promise对象
    return this.callbackFn(ctx).then(handleResponse);
  }

  createContext(req, res) {
    // 针对每个请求，都要创建ctx对象
    // 每个请求的ctx request response
    // ctx代理原生的req res就是在这里代理的
    let ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    ctx.app = ctx.request.app = ctx.response.app = this;
    return ctx;
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
}

module.exports = Application;

function respond(ctx) {
  // 根据ctx.body的类型，返回最后的数据
  /* 可能的类型，代码删减了部分判断
  1. string
  2. Buffer
  3. Stream
  4. Object
  */
  let content = ctx.body;
  if (typeof content === 'string') {
    ctx.res.end(content);
  }
  else if (typeof content === 'object') {
    ctx.res.end(JSON.stringify(content));
  }
}