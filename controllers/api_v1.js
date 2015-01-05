'use strick';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Connection = mongoose.model('Connection');

exports.getBitcoinAddress = function *(next) {
  var emailHash = this.params.email_hash;
  var query = Connection.where({ email_hash: emailHash });
  var connection = yield query.findOne().exec();

  if (!connection) {

  } else {
    this.body = connection.toJSON();
  }
}
