'use strict';

/**
 * Module Dependencies
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConnectionSchema = new Schema({
  _id             : { type: mongoose.Schema.ObjectId, select: false },
  __v             : { type: Number, select: false },
  email_hash      : { type: String, default: '' },
  bitcoin_address : { type: String, default: '' }
});

mongoose.model('Connection', ConnectionSchema);
