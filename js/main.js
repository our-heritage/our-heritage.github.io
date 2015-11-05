(function(w, d, u) {
    // Mozilla, Opera, Webkit
    if(document.addEventListener) { // esto es innecesario, estan cargando jQuery usen el metodo que ya les da
      document.addEventListener('DOMContentLoaded', function() {
        document.removeEventListener('DOMContentLoaded', arguments.callee, false);
        domReady();
      }, false );

    // If IE event model is used
    } else if(document.attachEvent) {
      // ensure firing before onload
      document.attachEvent('onreadystatechange', function(){
        if ( document.readyState === 'complete' ) {
          document.detachEvent('onreadystatechange', arguments.callee );
          domReady();
        }
      });
    }

    function domReady() { // usen jQuery, para eso ya lo cargaron

      // Counter variable ///////////////////////////////////////////////////////
      var count = 0;
      //Enquirel.js ************************************************************
      enquire
      .register('screen and (min-width: 768px) and (max-width: 1280px)', function() {
          navgameScroll();
      })
      .register('screen and (max-width: 766px)', function() {
          smallerViewports(count);
      })
      .register('screen and (min-width: 768px)', function() {
          largerViewports(count);
      });

      navTeamScroll();

    }
})(window, document);

// larger viewports ////////////////////////////////////////////////////////////


// Todo lo que esta aca afuera ensucion el global

function largerViewports(count) {

  var currentChar;
  var target = $('.gallery-imgs');
  var galleryBtn = target.children('li');
  var charBtn = $('.char_btn');
  var overallCharContainer = $('#char_details');
  var details = $('#details');
  var charContainers = $('.tap-info');

// Nav-scroll //////////////////////////////////////////////////////////////////

  $('.game-nav a').click(function() {
    $('html, body').stop().animate({
      scrollTop: $( $(this).attr('href') ).offset().top - -10
    }, 800);
    return false;
  });

//Characters ///////////////////////////////////////////////////////////////////

    charBtn.on('click', function() {
      chosen = $(this).attr('value');
      for(var i = 0; i < charContainers.length; i++){
        currentChar = charContainers[i].id;
        if (chosen == currentChar) {
          count = i;
          detailsGenerator(i);
        }
      }
    });

    $('.left').on('click', function() {
      count --;
      if(count < 0){
        count = 3 ;
      }
      detailsGenerator(count);
    });

    $('.right').on('click', function() {
      count++;
      if (count == 4) {
        count = 0;
      }
      detailsGenerator(count);
    });

    $('#hide').on('click',function(){
      displayer('hide');
    });

    function detailsGenerator(count) {

      var currId = charContainers[count].id;
      var charIntro = $('.tap-banner-'+currId).html();
      var charBrief = $('#'+currId).html();
      details.html(charIntro + charBrief );
      displayer('show');
    }

    function displayer(option) {
      if (option == 'show') {
        overallCharContainer.removeClass('hidden');
      } else {
        overallCharContainer.addClass('hidden');
      }
    }

//Gallery //////////////////////////////////////////////////////////////////////

    galleryBtn.on('click', function() {

      function showFullPicture(id) {
        $('#full-picture').attr('src', 'img/gallery/'+id+'.jpg');
      }

      var pictureId = this.id;
      showFullPicture(pictureId);

      $('#show-fullimage').removeClass('hidden').addClass('modal');

      $('#previous').on('click', function() {
        count--;
        if (count <= 0) {
          count = 9 - 1;
        }
        showFullPicture('pic-'+count);
      });

      $('#next').on('click', function() {
        count++;
        if (count >= 9) {
          count = 1;
        }
        showFullPicture('pic-'+count);
      });

      $('#closePopUp').on('click', function() {
        $('#show-fullimage').removeClass('modal').addClass('hidden');
      });
    });
}

// Smaller Viewports ///////////////////////////////////////////////////////////

function smallerViewports(count) {

  var closeTap = $('.close-tap'),
      closeNavLang = $('.close-lang'),
      listLang = $('#list-lang'),
      listLangItem = $('.list-lang-item'),
      tapCharacter = $('.taps-character .tap-banner'),
      openCreditsMenu  = $(".show-menu , .header-nav-content");


// Close Tap Character /////////////////////////////////////////////////////////

  tapCharacter.on('click', function() {
    if ($(this).next().hasClass( 'expand-tap-info' )) {
      $(this).next().removeClass('expand-tap-info');
    }else {
      $('.tap-info').removeClass('expand-tap-info');
      $(this).next().addClass('expand-tap-info');
    }
  });

  closeTap.on('click', function() {
    $('.tap-info').removeClass('expand-tap-info');
  });

// Menu Lang ////////////////////////////////////////////////////////////////////

  listLang.on('click', function() {
    for (var i = 0; i < listLangItem.length; i++) {
      listLangItem.addClass(function( i ) {
        return 'list-lang-item position' + i;
      });
    };
  });

  closeNavLang.on('click', function() {
    for (var m = 0; m < listLangItem.length; m++) {
      listLangItem.removeClass(function( m ) {
        return 'list-lang-item position'+m;
      });
      listLangItem.addClass('list-lang-item')
    };
  });

// Dropdown Menu Credits Page////////////////////////////////////////////////////

  openCreditsMenu.on('click', function() {
    $(".team-nav-content").toggleClass("expanded");
  });

// Gallery Swipe ////////////////////////////////////////////////////////////////
  
  // IIFE dentro de otra funcion?
  (function gallerySwipe() {

    var initNumber = 1;
    var counterNumber;
    var itemSwipe = $('.slider-content');
    var counterSwipe =  $('#counter-slider');
    var contentSwipe = $('#gallery-container');

    var countIteam = itemSwipe.length-1;

    contentSwipe.swipe( {
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
          if(count == countIteam){
            $('.first-pic').removeClass('first-pic');
            $('.slider-content:first').addClass('first-pic');
            counterNumber ='1';
            initNumber = 1;
            count = 0;
          } else {
            $('.first-pic').removeClass('first-pic').next('.slider-content').addClass('first-pic');
            counterNumber = initNumber+1;
            initNumber = initNumber+1;
            count = count+1;
          }
          $('.counterNumber').text(counterNumber);
        },
        swipeRight:function(event, direction, distance, duration, fingerCount) {
         if(count == 0){
            $('.first-pic').removeClass('first-pic');
            $('.slider-content:last').addClass('first-pic');
            counterNumber = itemSwipe.length;
            initNumber = itemSwipe.length;
            count = countIteam;
          }else{
            $('.first-pic').removeClass('first-pic').prev('.slider-content').addClass('first-pic');
            counterNumber = initNumber-1;
            initNumber = initNumber-1;
            count = count-1;
          }
          $('.counterNumber').text(counterNumber);
        },
        threshold:0
      });

  })();
}

//Nav Game Tablet /////////////////////////////////////////////////////////////
function navgameScroll(){
    var waypoints = $('#game-nav').waypoint(function(direction) {
       if(direction === 'down'){
            $('.game-nav').addClass('stuck');
       }else{
            $('.game-nav').removeClass('stuck');
       }
    }, {
        offset:5
    })
}

var creditsModule = (function(window,undefined) {

  toggleDisplay = function(id){
    $(".team-content").removeClass("visible");
    $("#team"+id+"").addClass("visible");
  }

  scrollEfect = function(attr){
    $('html, body').stop().animate({
          scrollTop: $(attr).offset().top - 100
      }, 800);
      return false;
  }

  navTeamScroll = function(){
    var waypoints = $('#team-nav').waypoint(function(direction) {
       if(direction === 'down'){
            $('.team-nav').addClass('stuck');
       }else{
            $('.team-nav').removeClass('stuck');
       }
    }, {
        offset:5
    })
}

  return{
    toggle : toggleDisplay,
    scrollEfect : scrollEfect,
    navTeamScroll : navTeamScroll
  }

})( window, undefined );

$(".display").click(function(){
    var id = $(this).attr("id");
    creditsModule.toggle(id);
});

$('.header-nav-item a').click(function(){
  var attr = $(this).attr('href');
  creditsModule.scrollEfect(attr);
});

creditsModule.navTeamScroll()