(function() {
  $(document).ready(function() {
    var count = 0;

    enquire
    .register('screen and (min-width: 768px) and (max-width: 1280px)', {
      match : function() {
        navGameScroll(); 
      },  
      unmatch : function() {
        $('.game-nav').removeClass('nav-sticky');
      }
    })
    .register('screen and (max-width: 766px)', function() {
      gallerySwipe(count);
      menuLang();
      tapCharacter();
      navCreditos();
    })
    .register('screen and (min-width: 768px)', function() {
      gameScroll();
      controlsModal();
      charactersModal(count);
      galleryModal(count);
    });

    changeColorCreditos();
    videoTeaserModal();
  });

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

  $('.about-image').on('click', function() {
    $('.about-image').removeClass('hidden-image');
    $(this).toggleClass('hidden-image');
  });

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

  function gallerySwipe(count) {
    var initNumber = 1,
      counterNumber,
      itemSwipe = $('.slider-content'),
      counterSwipe = $('#counter-slider'),
      contentSwipe = $('#gallery-container'),
      countIteam = itemSwipe.length - 1;

    contentSwipe.swipe({
      swipeLeft: function(event, direction, distance, duration, fingerCount) {
        if (count == countIteam) {
          $('.first-pic').removeClass('first-pic');
          $('.slider-content:first').addClass('first-pic');
          counterNumber = '1';
          initNumber = 1;
          count = 0;
        } else {
          $('.first-pic').removeClass('first-pic').next('.slider-content').addClass('first-pic');
          counterNumber = initNumber + 1;
          initNumber = initNumber + 1;
          count = count + 1;
        }
        $('.counterNumber').text(counterNumber);
      },
      swipeRight: function(event, direction, distance, duration, fingerCount) {
        if (count == 0) {
          $('.first-pic').removeClass('first-pic');
          $('.slider-content:last').addClass('first-pic');
          counterNumber = itemSwipe.length;
          initNumber = itemSwipe.length;
          count = countIteam;
        } else {
          $('.first-pic').removeClass('first-pic').prev('.slider-content').addClass('first-pic');
          counterNumber = initNumber - 1;
          initNumber = initNumber - 1;
          count = count - 1;
        }
        $('.counterNumber').text(counterNumber);
      },
      threshold: 0
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
    var openCreditsMenu = $('.show-menu, .header-nav-item');

    openCreditsMenu.on('click', function() {
      $('.team-nav-content').toggleClass('expanded');
      
    });
  }

  function navGameScroll() {
    var waypoints = $('#game-nav').waypoint(function(direction) {
      if (direction === 'down') {
        $('.game-nav').addClass('nav-sticky');
      } else {
        $('.game-nav').removeClass('nav-sticky');
      }
    }, {
      offset: 5
    })
  }

  function showFullPicture(id) {
    $('#gallery-picture').attr('src', 'img/gallery/' + id + '.jpg');
  }

  function tapCharacter() {
    var closeTap = $('.close-tap'),
        tapCharacter = $('.taps-character div');

    tapCharacter.on('click', function() {
      $('.tap-info').removeClass('tap-expand-info');
      $(this).next().addClass('tap-expand-info');
    });
    tapCharacter.trigger( "click" );
  }

  function videoTeaserModal() {
    var video = $('.teaser'),
        close = $('.teaser .close'),
        btn = $('#btn-play-js'),
        player = $('#ytplayer'),
        content = '<iframe class="main-video-player" width="640" height="480" src="https://www.youtube.com/embed/DLzxrzFCyOs'+
      '?autoplay=1&amp;rel=0&amp;'+
      'controls=1&amp;showinfo=1"  frameborder="0"/>';

    btn.click(function(){
      displayModal('show', video);
      player.html(content);
    });

    close.click(function(){
      player.html('');
    });
  }

}());