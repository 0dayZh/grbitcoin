$(function () {
  $("#submit_form_email").validate({
    rules: {
      field: {
        required: true,
        email: true
      }
    }
  });

  $('#submit_form_email').submit(function (e) {
    alert($("submit_form_email").valid());
    return false;
    if ($("submit_form_email").valid()) {
      alert('Valid!');
      return true;
    } else {
      alert('invalid!');
      return false;
    }
  });
});
