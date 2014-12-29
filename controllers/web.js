var UtilEmail = require('../util-email.js');

exports.root = function *(next) {
  this.body = "GET root.";
}
