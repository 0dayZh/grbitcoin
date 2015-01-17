'use strict';

/**
 * Module dependencies.
 */
var emailUtils = require('../email-utils');
var mongoose = require('mongoose');
var crypto = require('crypto');
var moment = require('moment');
var thunk = require('thunkify');
var bitcoinAddress = require('bitcoin-address');

var Token = mongoose.model('Token');
var Connection = mongoose.model('Connection');

exports.index = function *(next) {
  yield this.render('index', {});
}

exports.rebindEmail = function *(next) {

}

exports.bindEmail = function *(next) {
  var token_string = this.params.token_string;
  var query = Token.where({ token_string: token_string });
  var token = yield query.findOne().exec();
  var now = moment();

  if (token) {
    if (moment(token.expiration_date).diff(now) <= 0) {
      // token expirated
      yield this.render('notice', { notice: 'Token expirated.' });
    } else {
      // token works
      yield this.render('bind', { email: token.email });
    }
  } else {
    // token is regenerated or token is not avaiable
    yield this.render('notice', { notice: 'Make sure you open the link from the latest email.' });
  }
}

exports.bindBitcoinAddress = function *(next) {
  var bitcoin_address = this.request.body.bitcoin_address;
  var token_string = this.request.body.token_string;

  if (bitcoinAddress.validate(bitcoin_address) && token_string) {
    var query = Connection.where({ bitcoin_address: bitcoin_address });
    var connection = yield query.findOne().exec();

    if (connection) {
      yield this.render('notice', { 'notice': 'The Bitcoin address has binded to another email. You can not bind it to more than one email, unless you unbind it first.' });
    } else {
      var token_string = this.request.body.token_string;
      var query = Token.where({ token_string: token_string });
      var token = yield query.findOne().exec();

      if (token) {
        var connection = new Connection({ email: token.email, bitcoin_address: bitcoin_address });
        connection.save = thunk(connection.save);
        connection = yield connection.save();
        connection = connection[0];
        yield this.render('notice', { 'notice': 'Binded successfully.' });
      } else {
        yield this.render('notice', { 'notice': 'Make sure you open the url from email directly.' });
      }
    }
  } else {
    yield this.render('notice', { 'notice': 'The Bitcoin address is invalide.' });
  }
}

exports.unbindEmail = function *(next) {

}

exports.sendEmailIfNeeded = function *(next) {
  if (this.checkBody('email').isEmail("Bad email."));
  if (this.errors) {
    console.log(this.errors);
    this.throw(400, 'Bad email.');
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
      newToken.save = thunk(newToken.save);
      newToken = yield newToken.save();
      token = newToken[0];
    } else if (moment(token.expiration_date).diff(now) <= 0) {
      // token expirated
      console.log('Email ( ' + email + ' ) has been requested before, but the token has expirated.');
      var hash = crypto.createHash('md5').update(email).digest('hex');
      token.token_string = hash;
      token.expiration_date = now.add(1, 'day').toDate();
      token.save = thunk(token.save);
      token = yield token.save();
      token = token[0];
    } else {
      // email has been requested before
      console.log('Email ( ' + email + ' ) has been requested before, and the token is still available.');
    }

    console.log('Fetching connection bind to: ' + email);
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

        emailUtils.sendEmail(email, 'Request for your action', html_body);
    } else {
      console.log('Email ( ' + email + ' ) has not binded.');
      var html_body = yield this.render('email-templates/bind-premailer', {
        writeResp: false,
        token_string: token.token_string});

        emailUtils.sendEmail(email, 'Bind to your bitcoin address', html_body);
    }
  }

  this.status = 200;
  this.body = { 'statusCode': 200 };
}

exports.notice = function *(next) {
  yield this.render('notice', { 'notice': this.params.notice_message });
}
