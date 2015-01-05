'use strict';

/**
 * Module dependencies.
 */
var UtilEmail = require('../util-email.js');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var crypto = require('crypto');
require('date-utils');

var Token = mongoose.model('Token');
var Connection = mongoose.model('Connection');

exports.index = function *(next) {
  yield this.render('index', {});
}

exports.sendEmailIfNeeded = function *(next) {
  if (this.checkBody('email').isEmail("Bad email."));
  if (this.errors) {
    console.log(this.errors);
  } else {
    var email = this.request.body.email;
    email = email.trim().toLowerCase();

    // check if the email has binded to a bitcoin address.
    var query = Connection.where({ email: email });
    var connection = yield query.findOne().exec();

    console.log('Checking email: ' + email);
    if (connection) {
      // binded
      console.log('Email ( ' + email + ' ) has binded.');
      var html_body = fs.readFileSync(path.join(__dirname, '../views/email-templates/binded-premailer.html'), 'utf8');
      UtilEmail.sendEmail(email, 'Request for your action', html_body);
    } else {
      // check if the email has been request before.
      var query = Token.where({ email: email });
      var token = yield query.findOne().exec();
      var now = Date.now();

      if (!token) {
        // fresh incoming email
        console.log('Email ( ' + email + ' ) is a fresh incoming one.');
        var hash = crypto.createHash('md5').update(email).digest('hex');
        var newToken = new Token({ email: email, token_string: hash, expiration_date: now.addHours(12)});
        console.log(newToken.toJSON());
        newToken = yield newToken.save();

        var html_body = fs.readFileSync(path.join(__dirname, '../views/email-templates/bind-premailer.html'), 'utf8');
        UtilEmail.sendEmail(email, 'Bind to your bitcoin address', html_body);
      } else if (Date.compare(token.expiration_date, now) >= 0) {
        // token expirated
        console.log('Email ( ' + email + ' ) has been requested before, but the token has expirated.');
        var hash = crypto.createHash('md5').update(email).digest('hex');
        token.token_string = hash;
        token.expiration_date = now.addHours(12);
        yield token.save();

        var html_body = fs.readFileSync(path.join(__dirname, '../views/email-templates/bind-premailer.html'), 'utf8');
        UtilEmail.sendEmail(email, 'Bind to your bitcoin address', html_body);
      } else {
        // email has been requested before
        console.log('Email ( ' + email + ' ) has been requested before, and the token is still available.');
        // ignore.
      }
    }
  }

  this.redirect('/');
}
