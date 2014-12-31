'use strict';

/**
 * Module dependencies.
 */
var UtilEmail = require('../util-email.js');

exports.index = function *(next) {
  yield this.render('index', {});
}

exports.sendEmailIfNeeded = function *(next) {
  var email = this.params.email;
  console.log("Email: " + email);
}
