'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Connection = mongoose.model('Connection');
var bitcoinAddress = require('bitcoin-address');

exports.getBitcoinAddress422 = function *(next) {
  this.throw(422, "Validation Failed");
}

exports.getBitcoinAddress = function *(next) {
  var email_hash = this.params.email_hash;
  email_hash = email_hash.trim().toLowerCase();

  var query = Connection.where({ email_hash: email_hash });
  var connection = yield query.findOne().exec();

  if (!connection) {
    this.throw(404, "No Bitcoin address bind to this email_hash.");
  } else {
    this.body = connection.toJSON();
  }
}
