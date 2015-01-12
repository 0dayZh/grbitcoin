'use strict';

var Mailgun = require('mailgun-js');

var api_key = "key-b6d71506b448a6a59dfd78e4a3917d8b";
var domain = "grbitcoin.com";
var from_who = "Grbitcoin <postmaster@grbitcoin.com>";

exports.sendEmail = function (to_who, subject, html_body) {
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});
  var data = {
    from: from_who,
    to: to_who,
    subject: subject,
    html: html_body
  };
  mailgun.messages().send(data, function(err, body) {
    if (err) {
      console.log("got an error: ", err);
    } else {
      console.log(body);
    }
  });
}
