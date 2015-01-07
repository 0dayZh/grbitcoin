'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Connection = mongoose.model('Connection');

exports.getBitcoinAddress = function *(next) {
  var req_email = this.params.email;
  req_email = req_email.trim().toLowerCase();

  var query = Connection.where({ email: req_email });
  var connection = yield query.findOne().exec();

  if (!connection) {
    var error = new Error();
    error.status = 404;
    error.message = 'Email is not binded';

    this.throw(error);
  } else {
    this.body = connection.toJSON();
  }
}

exports.getEmail = function *(next) {
  var bitcoin_address = this.params.bitcoin_address;

  var query = Connection.where({ bitcoin_address: bitcoin_address });
  var connection = yield query.findOne().exec();

  if (!connection) {
    var error = new Error();
    error.status = 404;
    error.message = 'Bitcoin address is not binded';

    this.throw(error);
  } else {
    this.body = connection.toJSON();
  }
}
