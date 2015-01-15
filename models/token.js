'use strict';

/**
* Module Dependencies
*/
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  email           : { type: String, default: '' },
  token_string    : { type: String, default: '' },
  expiration_date : { type: Date, default: '' }
});

TokenSchema.method('toJSON', function() {
  var token = this.toObject();
  delete token._id;
  delete token.__v;
  return token;
});

mongoose.model('Token', TokenSchema);
