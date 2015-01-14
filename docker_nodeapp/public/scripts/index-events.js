$(function () {
  function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  $('#submit_form_email').submit(function (event) {
    var email_input = $('#email_input').val();
    if (!IsEmail(email_input)) {
      $(document).trigger("add-alerts", [
    {
      'message': "Please make sure the email address is right.",
      'priority': 'error'
    }
    ]);
      return false;
    }

    $(document).trigger("add-alerts", [
    {
      'message': "Sending email...",
      'priority': 'success'
    }
    ]);

    var jqxhr = $.ajax({
      url: 'send_email',
      type:'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data:
      {
        'email': $('#email_input').val()
      }
    })
    .done(function( data, textStatus, jqXHR ) {
      $('#email_input').val('');

      $(document).trigger("add-alerts", [
      {
        'message': "Success! Email has been sent to your own email, please check it out and enjoy your life.",
        'priority': 'success'
      }
      ]);
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      $(document).trigger("add-alerts", [
      {
        'message': "Failure! Some wrong happened.",
        'priority': 'warning'
      }
      ]);
    }).
    always(function( data_jqXHR, textStatus, jqXHR_errorThrown ) {

    });

    return false; // to ignore form action
  });
});
