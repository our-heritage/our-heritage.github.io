  //Global Variables ///////////////////////////////////////////////////////////////////////////////////
  var position;
  var galleryData;
  var sizeItem;
  var title;
  var cont;
  var num = 1;
  var index = 0;
  var currentChar;

  //HTML Elements ///////////////////////////////////////////////////////////////////////////////////
  var target = $('.gallery-imgs');
  var galleryBtn = target.children('li');
  var tapCharacter = $('.taps-character .tap-banner h3');
  var closeTap = $('.close-tap');
  var closeNavLang = $('.close-lang');
  var listLangItem = $('.list-lang-item');
  var listLang = $('#list-lang');
  var item = $('.slider-content');
  var contentSwipe = $('#gallery-container');
  var counter =  $('#counter');
  var charBtn = $('.char_btn');
  var overallCharContainer = $('#char_details');
  var details = $('#details');
  var charContainers = $('.tap-info');


//Enquirel.js ******************************************************************

enquire
.register("screen and (min-width: 768px) and (max-width: 1280px)", function() {
    console.log("scroll");
    navgameScroll();
})
.register("screen and (max-width: 766px)", function() {
    smallerViewports();
})
.register("screen and (min-width: 768px)", function() {
    init();
    largerViewports();
});


//Json data ///////////////////////////////////////////////////////////////////////////////////
function init() {
  $.ajax({
    type: 'GET',
    url: 'js/game-data.json',
    dataType: 'json',
    success: function(data) {
      galleryData = data.Gallery;
    },
    error: function(data) {;
      console.log('ERROR: Unreachable information needed'); //deberia ser una alerta
    }
  });
}

// larger viewports ///////////////////////////////////////////////////////////////////////////////////
function largerViewports() {
// nav-scroll ///////////////////////////////////////////////////////////////////////////////////
  $('.game-nav a').click(function(){
    $('html, body').stop().animate({
      scrollTop: $( $(this).attr('href') ).offset().top - -10
    }, 800);
    return false;
  });

//CHARACTERS ///////////////////////////////////////////////////////////////////////////////////
    charBtn.on('click', function() {
      chosen = $(this).attr('value');
      for(var i = 0; i < charContainers.length; i++){
        currentChar = charContainers[i].id;
        if (chosen == currentChar) {
          position = i;
          detailsGenerator(i);
        }
      }
    });

    $('.left').on('click', function() {
      position --;
      if(position <= 0){
        position = 3 ;
      }
      detailsGenerator(position);
    });

    $('.right').on('click', function() {
      position++;
      if (position == 4) {
        position = 0;
      }
      detailsGenerator(position);
    });

    $('#hide').on('click',function(){
      displayer('hide');
    });

    function detailsGenerator(position){
      var currId = charContainers[position].id;
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

//GALLERY ///////////////////////////////////////////////////////////////////////////////////
    galleryBtn.on('click', function() {
      var number = this.id;
      for (var i = 0; i < galleryData.length; i++) {
        if (number == galleryData[i].number) {
          $('#full-picture').attr('src', galleryData[i].img);
        }
      }

      $('#show-fullimage').removeClass('hidden').addClass('modal');

      $('#previous').on('click', function() {
        index--;
        if (index < 0) {
          index = galleryData.length - 1;
        }
        $('#full-picture').attr('src', galleryData[index].img);
      });

      $('#next').on('click', function() {
        index++;
        if (index >= galleryData.length) {
          index = 0;
        }
        $('#full-picture').attr("src", galleryData[index].img);
      });

      $('#closePopUp').on('click', function() {
        $('#show-fullimage').removeClass('modal').addClass('hidden');
      });
    });
}

// smaller Viewports ///////////////////////////////////////////////////////////////////////////////////
function smallerViewports() {
// Close Tag ///////////////////////////////////////////////////////////////////////////////////
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

// Lang ///////////////////////////////////////////////////////////////////////////////////
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

// Gallery /////////////////////////////////////////////////////////////////////////////////
sizeItem=item.length-1;
title = '1/'+item.length;
  contentSwipe.on('swiperight',function(){
    if(cont == 0){
      $('.first').removeClass('first');
      $('.slider-content:last').addClass('first');
      title=(item.length)+'/'+item.length;
      num=item.length;
      cont=sizeItem;
    }else{
      $('.first').removeClass('first').prev('.slider-content').addClass('first');
      title=(num-1)+'/'+item.length;
      num=num-1;
      cont=cont-1;
    }
    $('.title').text(title);
  });
  contentSwipe.on('swipeleft',function(){
    if(cont==sizeItem){
      $('.first').removeClass('first');
      $('.slider-content:first').addClass('first');
      title='1/'+item.length;
      num=1;
      cont=0;
    }else{
      $('.first').removeClass('first').next('.slider-content').addClass('first');
      title=(num+1)+'/'+item.length;
      num=num+1;
      cont=cont+1;
    }
    $('.title').text(title);
  });
  counter.append('<p class="title">'+title+'</p>');
}

//Nav Game  ////////////////////////////////////////////////////////////////////////
function navgameScroll(){
    var waypoints = $('#game-nav').waypoint(function(direction) {
       if(direction === "down"){
            $(".game-nav").addClass("stuck");
       }else{
            $(".game-nav").removeClass("stuck");
       }
    }, {
        offset: 0
    })
}
