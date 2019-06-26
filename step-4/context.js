const delegate = require('delegates');

const proto = module.exports = {
  // context自身的方法
  toJSON() {
    return {
      request: this.request.toJSON(),
      response: this.response.toJSON(),
      app: this.app.toJSON(),
      originalUrl: this.originalUrl,
      req: '<original node req>',
      res: '<original node res>',
      socket: '<original node socket>'
    };
  },

  onerror(err) {
    // 默认的中间件报错捕获
    const { res } = this;

    if ('ENOENT' == err.code) {
      err.status = 404;
    } else {
      err.status = 500;
    }

    // 触发error事件
    this.app.emit('error', err, this);

    this.status = err.status;
    res.end(err.message || 'Internal error');
  }
}

// delegates 原理就是__defineGetter__和__defineSetter__

// method是委托方法，getter委托getter,access委托getter和setter。

// proto.status => proto.response.status
delegate(proto, 'response')
  .access('status')
  .access('body')


// proto.url = proto.request.url
delegate(proto, 'request')
  .access('url')
  .getter('header')