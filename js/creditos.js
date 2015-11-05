var creditsModule = (function(window,undefined) {

  dropdown = function() {
    $(".show-menu , .header-nav-content").click(function() {
      $(".header-nav-content").toggleClass("expanded");

    });
  }

  toggleDisplay = function(id) {
    $(".team-content").removeClass("visible");
    $("#team"+id+"").addClass("visible");
  }

  scrollEfect = function(attr) {
    $('html, body').stop().animate({
          scrollTop: $(attr).offset().top - 100
      }, 800);
      return false;
  }

return {
  dropdown : dropdown,
  toggle : toggleDisplay,
  scrollEfect : scrollEfect
}


})( window, undefined );


if ($(window).width() < 1000) { // para que esto si estamos usando enquire?
  creditsModule.dropdown();
}

$(".display").click(function() {
    var id = $(this).attr("id");
    creditsModule.toggle(id);
});

$('.header-nav-item a').click(function() {
  var attr = $(this).attr('href');
  creditsModule.scrollEfect(attr);
});
