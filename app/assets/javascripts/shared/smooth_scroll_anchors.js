$(document).ready(function(){
  $("a.smooth-scroll-anchor[href^=\"#\"]").on("click",function (event) {
    event.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $("html, body").stop().animate({
      "scrollTop": $target.offset().top
    }, 240, "easeOutQuad", function () {
      window.location.hash = target;
    });
  });
});
