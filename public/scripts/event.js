$(function () {
  $('#email_submit').click(function (e) {
    if ($("submit_form_email").valid()) {
      alert('Valid!');
      return false;
    } else {
      alert('invalid!');
      return false;
    }
  });
});
