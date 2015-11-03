(function(w, d, u) {
    // Mozilla, Opera, Webkit
    if(document.addEventListener) {
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

    function domReady() {
      //Enquirel.js ************************************************************
      enquire
      .register('screen and (min-width: 768px) and (max-width: 1280px)', function() {
          navgameScroll();
      })
      .register('screen and (max-width: 766px)', function() {
          smallerViewports();
      })
      .register('screen and (min-width: 768px)', function() {
          largerViewports();
      });

    }
})(window, document);

// larger viewports ////////////////////////////////////////////////////////////

function largerViewports() {

  var index = 0;
  var currentChar;
  var target = $('.gallery-imgs');
  var galleryBtn = target.children('li');
  var charBtn = $('.char_btn');
  var overallCharContainer = $('#char_details');
  var details = $('#details');
  var charContainers = $('.tap-info');

// nav-scroll //////////////////////////////////////////////////////////////////

  $('.game-nav a').click(function(){
    $('html, body').stop().animate({
      scrollTop: $( $(this).attr('href') ).offset().top - -10
    }, 800);
    return false;
  });

//CHARACTERS ///////////////////////////////////////////////////////////////////

    charBtn.on('click', function() {
      chosen = $(this).attr('value');
      for(var i = 0; i < charContainers.length; i++){
        currentChar = charContainers[i].id;
        if (chosen == currentChar) {
          index = i;
          detailsGenerator(i);
        }
      }
    });

    $('.left').on('click', function() {
      index --;
      if(index <= 0){
        index = 3 ;
      }
      detailsGenerator(index);
    });

    $('.right').on('click', function() {
      index++;
      if (index == 4) {
        index = 0;
      }
      detailsGenerator(index);
    });

    $('#hide').on('click',function(){
      displayer('hide');
    });

    function detailsGenerator(index) {

      var currId = charContainers[index].id;
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

//GALLERY //////////////////////////////////////////////////////////////////////

    galleryBtn.on('click', function() {

      function showFullPicture(id) {
        $('#full-picture').attr('src', 'img/gallery/'+id+'.jpg');
      }

      var pictureId = this.id;
      showFullPicture(pictureId);

      $('#show-fullimage').removeClass('hidden').addClass('modal');

      $('#previous').on('click', function() {
        index--;
        if (index <= 0) {
          index = 9 - 1;
        }
        showFullPicture('pic-'+index);
      });

      $('#next').on('click', function() {
        index++;
        if (index >= 9) {
          index = 1;
        }
        showFullPicture('pic-'+index);
      });

      $('#closePopUp').on('click', function() {
        $('#show-fullimage').removeClass('modal').addClass('hidden');
      });
    });
}

// smaller Viewports ///////////////////////////////////////////////////////////

function smallerViewports() {

  var tapCharacter = $('.taps-character .tap-banner h3');
  var closeTap = $('.close-tap');
  var closeNavLang = $('.close-lang');
  var listLangItem = $('.list-lang-item');
  var listLang = $('#list-lang');

// Close Tag ///////////////////////////////////////////////////////////////////

  tapCharacter.on('click', function() {
    if ($(this).parent('.tap-banner').next().hasClass( 'expand-tap-info' )) {
      $(this).parent('.tap-banner').next().removeClass('expand-tap-info');
    }else {
      $('.tap-info').removeClass('expand-tap-info');
      $(this).parent('.tap-banner').next().addClass('expand-tap-info');
    }
  });

  closeTap.on('click', function() {
    $('.tap-info').removeClass('expand-tap-info');
  });

// Lang ////////////////////////////////////////////////////////////////////////

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

// Gallery /////////////////////////////////////////////////////////////////////

  (function gallerySwipe() {

    var num = 1;
    var cont = 0;
    var title;
    var sizeItem;
    var item = $('.slider-content');
    var counter =  $('#counter');
    var contentSwipe = $('#gallery-container');

    sizeIteam=item.length-1;
    title = '1/'+item.length;

    contentSwipe.on('swiperight',function() {

      if(cont == 0){
          $('.first-pic').removeClass('first-pic');
          $('.slider-content:last').addClass('first-pic');
          title = (item.length)+'/'+item.length;
          num = item.length;
          cont = sizeIteam;
      }else{
          $('.first-pic').removeClass('first-pic').prev('.slider-content').addClass('first-pic');
          title=(num-1)+'/'+item.length;
          num = num-1;
          cont = cont-1;
      }
      $('.title').text(title);
    });

    contentSwipe.on('swipeleft',function() {

      if(cont == sizeIteam){
          $('.first-pic').removeClass('first-pic');
          $('.slider-content:first').addClass('first-pic');
          title ='1/'+item.length;
          num = 1;
          cont = 0;
      } else {
          $('.first-pic').removeClass('first-pic').next('.slider-content').addClass('first-pic');
          title = (num+1)+'/'+item.length;
          num = num+1;
          cont = cont+1;
      }
      $('.title').text(title);
    });

    counter.append('<p class="title">'+title+'</p>');

  })();
}

//Nav Game  ////////////////////////////////////////////////////////////////////

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
