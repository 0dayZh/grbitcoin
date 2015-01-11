$(function () {
  $('#submit_form_email').submit(function (event) {
    $(document).trigger("add-alerts", [
    {
      'message': "Hold on. Sending email...",
      'priority': 'success'
    }
    ]);
    $.ajax({
      url: 'send_email',
      type:'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data:
      {
        'email': $('#email_input').val()
      },
      success: function(msg)
      {
        $(document).trigger("add-alerts", [
        {
          'message': "Request email has been sent to your own email, please check it out and enjoy your life.",
          'priority': 'success'
        }
        ]);
      }
    });

    return false; // to ignore form action
  });
});
