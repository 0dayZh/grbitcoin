var UtilEmail = require('../util-email.js');

exports.index = function *(next) {
  yield this.render('index', {});
}

exports.sendEmailIfNeeded = function *(next) {
  var email = this.request.body;
  console.log("Email: " + email);
}
