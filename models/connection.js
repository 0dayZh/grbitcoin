'use strict';

/**
 * Module Dependencies
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConnectionSchema = new Schema({
  email           : { type: String, default: '' },
  email_hash      : { type: String, default: '' },
  bitcoin_address : { type: String, default: '' }
});

ConnectionSchema.method('toJSON', function() {
  var connection = this.toObject();
  delete connection._id;
  delete connection.__v;
  delete connection.email;
  delete connection.email_hash;

  return connection;
});

mongoose.model('Connection', ConnectionSchema);
