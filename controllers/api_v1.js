'use strick';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Connection = mongoose.model('Connection');

exports.getBitcoinAddress = function *(next) {
  var req_email = this.params.email;

  console.log('Incoming email: ' + req_email);
  req_email = req_email.trim().toLowerCase();
  console.log('Processed email: ' + req_email);

  var query = Connection.where({ email: req_email });
  var connection = yield query.findOne().exec();

  if (!connection) {

  } else {
    this.body = connection.toJSON();
  }
}
