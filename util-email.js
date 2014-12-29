var Mailgun = require('mailgun-js')

var api_key = "key-b6d71506b448a6a59dfd78e4a3917d8b";
var domain = "sandboxa3c49b6b3174412a91dd7d7d6d4024a4.mailgun.org";
var from_who = "Mailgun Sandbox <postmaster@sandboxa3c49b6b3174412a91dd7d7d6d4024a4.mailgun.org>";

exports.sendEmail = function *(next) {
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});
  mailgun.messages().send(data, function(err, body) {
    if (err) {
      console.log("got an error: ", err);
    } else {
      console.log(body);
    }
  });
}
