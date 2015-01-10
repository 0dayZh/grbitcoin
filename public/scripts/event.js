$(function () {
  $('#submit_form_email').submit(function (e) {
    // return false; // 不提交
    if ($("submit_form_email").valid()) {
      alert('Valid!');
      return false;
    } else {
      alert('invalid!');
      return false;
    }
  });
});
