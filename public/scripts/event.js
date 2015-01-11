$(function () {
  $('#submit_form_email').submit(function (e) {
    $('#submit_form_email').attr('action', "/sendEmail");
    $(document).trigger("add-alerts", [
  {
    'message': "Request email has been sent to your own email, please check it out and enjoy your life.",
    'priority': 'success'
  }
  ]);
});
});
