'use strict';

/**
 * Module dependencies.
 */
var UtilEmail = require('../util-email.js');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var Token = mongoose.model('Token');

exports.index = function *(next) {
  yield this.render('index', {});
}

exports.sendEmailIfNeeded = function *(next) {
  if (this.checkBody('email').isEmail("Bad email."));
  if (this.errors) {
    console.log(this.errors);
    this.redirect('/');
  } else {
    var email = this.request.body.email;
    // todo @0dayZh, create new Token

    this.redirect('/');

    var html_body = fs.readFileSync(path.join(__dirname, '../views/email-templates/confirm-premailer.html'), 'utf8');
    UtilEmail.sendEmail(email, 'Confirm your email to get early access', html_body);
  }
}
