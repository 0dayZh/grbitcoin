exports.getBitcoinAddress = function *(next) {
  var email_hash = this.params.email_hash;
  this.body = "getBitcoinAddress with email hash: " + email_hash;
}
