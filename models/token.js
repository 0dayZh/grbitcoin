'use strict';

/**
* Module Dependencies
*/
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  email_hash: { type: String, default: '' },
  token_string: { type: String, default: '' },
  expiration_date: { type: Date, default: '' }
});

mongoose.model('Token', TokenSchema);
