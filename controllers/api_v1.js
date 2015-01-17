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
  var req_email = this.params.email;
  req_email = req_email.trim().toLowerCase();

  var query = Connection.where({ email: req_email });
  var connection = yield query.findOne().exec();

  if (!connection) {
    this.throw(404, "No Bitcoin address bind to this email.");
  } else {
    this.body = connection.toJSON();
  }
}

exports.getEmail422 = function *(next) {
  this.throw(422, 'Validation Failed');
}

exports.getEmail = function *(next) {
  var bitcoin_address = this.params.bitcoin_address;

  if (!bitcoinAddress.validate(bitcoin_address)) {
    this.throw(422, 'Validation Failed');
    return;
  }

  var query = Connection.where({ bitcoin_address: bitcoin_address });
  var connection = yield query.findOne().exec();

  if (!connection) {
    this.throw(404, "No email bind to this Bitcoin address.");
  } else {
    this.body = connection.toJSON();
  }
}
