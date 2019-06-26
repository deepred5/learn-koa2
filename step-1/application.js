const http = require('http');

class Application {
  constructor() {
    this.callbackFn = null;
  }

  use(fn) {
    this.callbackFn = fn;
  }

  callback() {
    return (req, res) => this.callbackFn(req, res)
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
}

module.exports = Application;