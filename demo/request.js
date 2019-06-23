let url = require('url');

module.exports = {

  get header() {
    return this.req.headers;
  },

  set header(val) {
    this.req.headers = val;
  },
};