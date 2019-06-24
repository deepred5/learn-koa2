module.exports = {
  get status() {
    return this.res.statusCode;
  },

  set status(code) {
    this.res.statusCode = code;
  },

  get body() {
    return this._body;
  },

  set body(val) {
    // 源码里有对val类型的各种判断，这里省略
    this._body = val;
  },

}