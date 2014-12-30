var UtilEmail = require('../util-email.js');

exports.index = function *(next) {
  yield this.render('index', {});
}
