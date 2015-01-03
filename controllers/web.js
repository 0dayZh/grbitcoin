'use strict';

/**
 * Module dependencies.
 */
var UtilEmail = require('../util-email.js');

exports.index = function *(next) {
  yield this.render('index', {});
}

exports.sendEmailIfNeeded = function *(next) {
  if (this.checkBody('email').isEmail("Bad email."));
  if (this.errors) {
    console.log(this.errors);
  } else {
    this.redirect('/');
  }
}
