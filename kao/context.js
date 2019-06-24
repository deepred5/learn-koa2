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
}

// proto.status => proto.response.status
delegate(proto, 'response')
  .access('status')
  .access('body')


// proto.url = proto.request.url
delegate(proto, 'request')
  .access('url')
  .getter('header')