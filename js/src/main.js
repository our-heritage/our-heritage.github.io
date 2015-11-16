(function() {
  $(document).ready(function() {
    var count = 0;

    enquire.register('screen and (min-width: 768px) and (max-width: 1280px)', {

      match : function() {
        if ($('#game-nav').length > 0) {
          navGameScroll();
        }

        $('map').imageMapResize();
      },
      unmatch : function() {
        $('#game-nav').removeClass('nav-sticky');
        Waypoint.destroyAll();
      }
    });

    enquire.register('(max-width: 766px)', {

      match: function() {
        showAboutInfo();
        gallerySwipe();
        menuLang();
        tapCharacter();
        navCreditos();
      },
      unmatch: function() {
        $('.about-image').off('click');
      }
    });

    enquire.register('screen and (min-width: 768px)', {

      match : function() {
        gameScroll();
        charactersModal(count);
        galleryModal(count);
      },
      unmatch : function() {
        $('.gallery-imgs li').off('click');
      }
    });

    changeColorCreditos();
    controlsModal();
    videoTeaserModal();
  });

  function navGameScroll() {
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

  function changeColorCreditos() {
    $('.display').click(function() {
      var id = this.id;

      $('.team-content').removeClass('visible');
      $('#team' + id + '').addClass('visible');
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

  function controlsModal() {

    $('.close').on('click', function() {
      displayModal('hide');
    });
  }

  function showAboutInfo() {

    $('.about-image').on('click', function() {
      $('.about-image').removeClass('hidden-image');
      $(this).toggleClass('hidden-image');
    });
  }

  function charactersModal(count) {
    var currentChar,
        charBtn = $('.char_btn'),
        details = $('#char-details'),
        charContainers = $('.tap-info');

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

    $('#modal-char .previous-arrow').on('click', function() {
      count--;

      if (count < 0) {
        count = 3;
      }

      detailsGenerator(count);
    });

    $('#modal-char .next-arrow').on('click', function() {
      count++;

      if (count == 4) {
        count = 0;
      }

      detailsGenerator(count);
    });
  }

  function galleryModal(count) {
    var gallery = $('#modal-gallery');

    $('.gallery-imgs li').on('click', function() {
      var pictureId = this.id;

      showFullPicture(pictureId);
      displayModal('show', gallery);
    });

    $('#modal-gallery .previous-arrow').on('click', function() {
      count--;

      if (count <= 0) {
        count = 9 - 1;
      }

      showFullPicture('pic-' + count);
    });

    $('#modal-gallery .next-arrow').on('click', function() {
      count++;

      if (count >= 9) {
        count = 1;
      }

      showFullPicture('pic-' + count);
    });
  }

  function gallerySwipe() {
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

  function gameScroll() {
    $('.game-nav a').click(function() {
      $('html, body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top - -10
      }, 800);
      return false;
    });
  }

  function menuLang() {
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

  function navCreditos() {
    var openCreditsMenu = $('.show-menu, .display');

    openCreditsMenu.on('click', function() {
      $('.team-nav-content').toggleClass('expanded');
      $('#show-menu-arrow').removeClass('up-arrow');

      if ($('.team-nav-content').hasClass('expanded')) {
        $('#show-menu-arrow').addClass('up-arrow');
      };
    });
  }

  function showFullPicture(id) {
    $('#gallery-picture').attr('src', 'img/gallery/' + id + '.jpg');
  }

  function tapCharacter() {
    var expandTap = 'tap-expand-info',
        tapCharacter = $('.taps-character div');

    tapCharacter.on('click', function() {
      if ($(this).next().hasClass( expandTap )) {
        $(this).next().removeClass( expandTap );
      }else {
        $(".tap-info").removeClass( expandTap );
        $(this).next().addClass( expandTap );
      }
    });
  }

  function videoTeaserModal() {
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

}());
