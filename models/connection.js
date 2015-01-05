'use strict';

/**
 * Module Dependencies
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConnectionSchema = new Schema({
  email           : { type: String, default: '' },
  bitcoin_address : { type: String, default: '' }
});

mongoose.model('Connection', ConnectionSchema);
