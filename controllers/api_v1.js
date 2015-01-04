'use strick';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Connection = mongoose.model('Connection');

exports.getBitcoinAddress = function *(next) {
  var emailHash = this.params.email_hash;
  var query = Connection.where({ email_hash: emailHash });
  query.findOne(function (err, connection) {
    if (err) {
      console.log('Error' + err);
    } else {
      if (!connection && connection != '') {
        this.body = 'find resutl.';
      } else {
        this.body = 'mo match.';
      }
    }
  });
}
