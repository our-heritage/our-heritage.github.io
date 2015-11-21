$(document).ready(function() {
    var count = 0;

    enquire.register('screen and (min-width: 766px) and (max-width: 1280px)', {

      match : function() {
        if ($('#game-nav').length > 0) {
          tabletView.navGameScroll();
        }
        $('map').imageMapResize();
        $('.char-name h2').addClass('show');
        $('.char_btn').off('mouseenter mouseleave');
      },
      unmatch : function() {
        $('#game-nav').removeClass('nav-sticky');
        $('.char-name h2').removeClass('show');
        desktopView.characterHover();
        Waypoint.destroyAll();
      }
    });

    enquire.register('(max-width: 766px)', {

      match: function() {
        mobileView.showAboutInfo();
        mobileView.gallerySwipe(count);
        mobileView.menuLang();
        mobileView.tapCharacter();
        mobileView.navCreditos();
      },
      unmatch: function() {
        $('.about-image').off('click');
      }
    });

    enquire.register('screen and (min-width: 768px)', {

      match : function() {
        desktopView.gameScroll();
        desktopView.charactersModal(count);
        desktopView.characterHover();
        desktopView.galleryModal(count);
      },
      unmatch : function() {
        $('.gallery-imgs li').off('click');
      }
    });
    gameGeneral.changeColorCreditos();
    gameGeneral.controlsModal();
    gameGeneral.galleryTypeAction();
    gameGeneral.videoTeaserModal();
  });

var desktopView = (function() {

  var gameScroll = function() {
    var navLink = $('.game-nav a'),
        body = $('html, body');

    navLink.click(function() {
     body.stop().animate({
        scrollTop: $($(this).attr('href')).offset().top - -10
      }, 800);
      return false;
    });
  }

  var  charactersModal = function(count) {
    var currentChar,
    charBtn = $('.char_btn'),
    details = $('#char-details'),
    charContainers = $('.tap-info'),
    previousArrow = $('#modal-char .previous-arrow');
    nextArrow = $('#modal-char .next-arrow');

    charBtn.on('click', function() {
      chosen = $(this).attr('name');

      for (var i = 0; i < charContainers.length; i++) {
        currentChar = charContainers[i].id;

        if (chosen == currentChar) {
          count = i;
          detailsGenerator(i);
        }
      }
    });

    function detailsGenerator(count) {
      var currId = charContainers[count].id,
      overallCharContainer = $('#modal-char'),
      charIntro = $('.tap-banner-' + currId).html(),
      charBrief = $('#' + currId).html();

      details.html(charIntro + charBrief);
      displayModal('show', overallCharContainer);
    }

    previousArrow.on('click', function() {
      count--;

      if (count < 0) {
        count = 3;
      }

      detailsGenerator(count);
    });

    nextArrow.on('click', function() {
      count++;

      if (count == 4) {
        count = 0;
      }

      detailsGenerator(count);
    });
  }

  var characterHover = function(){
    var className,
        charBtn = $('.char_btn');

    charBtn.on({
      mouseenter: function () {
        className = $(this).attr('name');
        $('.'+className+'>h2').addClass('show');
      },
      mouseleave: function () {
        $('.'+className+'>h2').removeClass('show');
      }
    });
  }
  var galleryModal = function(count) {
    var gallery = $('#modal-gallery'),
        itemGallery = $('.gallery-imgs li'),
        previousArrow = $('#modal-gallery .previous-arrow'),
        nextArrow = $('#modal-gallery .next-arrow'),
        picturePath;

    itemGallery.on('click', function() {
      var pictureId = this.id;
      picturePath = $(this).children().attr('src');

      showFullPicture(picturePath);
      displayModal('show', gallery);
    });

    function makePicturePath(count) {
      return picturePath.substring(0, picturePath.indexOf('-')) + '-' + count + '.jpg';
    }

    previousArrow.on('click', function() {
      count--;

      if (count <= 0) {
        count = 9 - 1;
      }

      showFullPicture(makePicturePath(count));
    });

    nextArrow.on('click', function() {
      count++;

      if (count >= 9) {
        count = 1;
      }

      showFullPicture(makePicturePath(count));
    });
    var showFullPicture = function(path) {
      $('#gallery-picture').attr('src', path);
    }
  }

  return{
    gameScroll:gameScroll,
    charactersModal:charactersModal,
    characterHover:characterHover,
    galleryModal:galleryModal
  }
})();

var mobileView = (function(){
  var showAboutInfo = function() {
    $('.about-image').on('click', function() {
      $('.about-image').removeClass('hidden-image');
      $(this).toggleClass('hidden-image');
    });
  }
  var gallerySwipe = function() {
    var initNumber = 1,
    itemSwipe = $('.slider-content'),
    contentSwipe = $('#gallery-container');

    contentSwipe.swipe({
      swipeLeft: function() {
        if(initNumber != itemSwipe.length){
          $('.first-pic').removeClass('first-pic').next('.slider-content').addClass('first-pic');
          initNumber=initNumber+1;
        }else{
          $('.first-pic').removeClass('first-pic')
          $('.slider-content:first').addClass('first-pic');
          initNumber=1;
        }
        $('.counterNumber').text(initNumber);
      },
      swipeRight: function() {
        if(initNumber != 1){
          $('.first-pic').removeClass('first-pic').prev('.slider-content').addClass('first-pic');
          initNumber=initNumber-1;
        }else{
          $('.first-pic').removeClass('first-pic')
          $('.slider-content:last').addClass('first-pic');
          initNumber=itemSwipe.length;
        }
        $('.counterNumber').text(initNumber);
      },
      threshold: 0,
      triggerOnTouchEnd: false
    });
  }
  var menuLang = function() {
    var closeNavLang = $('.close-lang'),
    listLang = $('#list-lang'),
    listLangItem = $('.list-lang-item')

    listLang.on('click', function() {
      for (var i = 0; i < listLangItem.length; i++) {
        listLangItem.addClass(function(i) {
          return 'list-lang-item lang-item-position-' + i;
        });
      };
    });

    closeNavLang.on('click', function() {
      for (var m = 0; m < listLangItem.length; m++) {
        listLangItem.removeClass(function(m) {
          return 'list-lang-item lang-item-position-' + m;
        });

        listLangItem.addClass('list-lang-item');
      };
    });
  }
  var tapCharacter = function() {
    tapCharacter = $('.taps-character');
    tapCharacter.find('.tap-info').hide();

    tapCharacter.find('.tap-banner').click(function () {
      var next = $(this).next();
      next.slideToggle('slow');
      $('.tap-info').not(next).slideUp('slow');
      return false;
    });
  }
  var navCreditos = function() {
    var openCreditsMenu = $('.show-menu, .display');

    openCreditsMenu.on('click', function() {
      $('.team-nav-content').toggleClass('expanded');
      $('#show-menu-arrow').removeClass('up-arrow');

      if ($('.team-nav-content').hasClass('expanded')) {
        $('#show-menu-arrow').addClass('up-arrow');
      };
    });
  }
  return{
    showAboutInfo:showAboutInfo,
    gallerySwipe:gallerySwipe,
    menuLang:menuLang,
    tapCharacter:tapCharacter,
    navCreditos:navCreditos
  }
})();

var tabletView = (function() {
  var navGameScroll = function() {
    var waypoint = new Waypoint({
      element: $('#game-nav'),
      handler: function(direction) {
        if (direction === 'down') {
          $('#game-nav').addClass('nav-sticky');
        } else {
          $('#game-nav').removeClass('nav-sticky');
        }
      },
      offset: 0
    })
  }
  return{
    navGameScroll:navGameScroll
  }
})();

var gameGeneral = (function(){

  var changeColorCreditos = function() {
    $('.display').click(function() {
      var id = this.id;

      $('.team-content').removeClass('visible');
      $('#team' + id + '').addClass('visible');
    });
  }

  var galleryTypeAction = function() {
    var eachImage = $('.slider-image');
    var galleryType = $('.gallery-type span');

    galleryType.on('click', function() {
      galleryType.removeClass('gallery-selected')

      $(this).addClass('gallery-selected');

      var option = $(this).text();
      if (option == 'Concept Art') {
        eachImage.each(function () {
          $(this).attr('src', $(this).attr('src').replace('screenshot', 'concept'));
        });
      } else {
        eachImage.each(function () {
          $(this).attr('src', $(this).attr('src').replace('concept', 'screenshot'));
        });
      }
    })
  }

  var videoTeaserModal = function() {
    var video = $('.teaser'),
    close = $('.teaser .close'),
    btn = $('#btn-play-js'),
    player = $('#ytplayer'),
    content = '<iframe src="https://www.youtube.com/embed/DLzxrzFCyOs' + "?autoplay=1&amp;rel=0&amp;" + 'controls=1&amp;showinfo=1"  frameborder="0"></iframe>';

    btn.click(function(){
      displayModal('show', video);
      player.html(content);
    });

    close.click(function(){
      player.html('');
    });
    }

  return{
    changeColorCreditos:changeColorCreditos,
    controlsModal:controlsModal,
    galleryTypeAction:galleryTypeAction,
    videoTeaserModal:videoTeaserModal
  }
})();
function controlsModal () {
    $('.close').on('click', function() {
      displayModal('hide');
    });
}
function displayModal(option, container) {
    var container = container;
    if (option == 'show') {
      container.removeClass('hidden');
    } else {
      $('.modal').addClass('hidden');
    }
  }