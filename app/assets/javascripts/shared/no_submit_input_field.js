$(function () {
  $("[data-no-submit=true]").on("keydown keyup", function (event) {
    if (event.keyCode == 13) {
      var $inputElements = $(".input-field input, .input-field select, .input-field textarea");
      var index = $inputElements.index(this) + 1;
      $inputElements.eq(index).focus();
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });
});
