'use strict';

/**
 * Module dependencies.
 */
var UtilEmail = require('../util-email.js');
var mongoose = require('mongoose');
var crypto = require('crypto');
var moment = require('moment');

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

    console.log('Checking email: ' + email);
    // check if the email has been request before.
    var query = Token.where({ email: email });
    var token = yield query.findOne().exec();
    var now = moment();

    if (!token) {
      // fresh incoming email
      console.log('Email ( ' + email + ' ) is a fresh incoming one.');
      var hash = crypto.createHash('md5').update(email).digest('hex');
      var newToken = new Token({ email: email, token_string: hash, expiration_date: now.add(1, 'day').toDate()});
      console.log(newToken.toJSON());
      newToken = yield newToken.save();
      token = newToken;
    } else if (moment(token.expiration_date).diff(now) <= 0) {
      // token expirated
      console.log('Email ( ' + email + ' ) has been requested before, but the token has expirated.');
      var hash = crypto.createHash('md5').update(email).digest('hex');
      token.token_string = hash;
      token.expiration_date = now.add(1, 'day').toDate();
      token = yield token.save();
    } else {
      // email has been requested before
      console.log('Email ( ' + email + ' ) has been requested before, and the token is still available.');
    }

    // check if the email has binded to a bitcoin address.
    var query = Connection.where({ email: email });
    var connection = yield query.findOne().exec();

    // send email
    if (connection) {
      // binded
      console.log('Email ( ' + email + ' ) has binded.');
      var html_body = yield this.render('email-templates/binded-premailer', {
        writeResp: false,
        bitcoin_address: connection.bitcoin_address,
        token_string: token.token_string});

      UtilEmail.sendEmail(email, 'Request for your action', html_body);
    } else {
      var html_body = yield this.render('email-templates/bind-premailer', {
        writeResp: false,
        token_string: token.token_string});

      UtilEmail.sendEmail(email, 'Bind to your bitcoin address', html_body);
    }
  }

  this.redirect('/');
}
