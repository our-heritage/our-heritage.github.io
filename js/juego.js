//Global Variables ***********************************************************************
var char_id = 0;
var index = 0;
var position = 0;
var galleryData = '';
var charactersData = '';

//HTML Elements ***********************************************************************
var target = $(".gallery-imgs");
var galleryBtn = target.children("li");
var character_btn = $('.character_btn');
var overall_char_container = $('#char_details');
var char_desktop = $('#characters_desktop');
var char_mobile = $('#characters_mobile');
var individual_details = $('#details');

// var char_desktop_content = char_desktop.html();
// var char_mobile_content = char_mobile.html();

//Enquire Usage ***********************************************************************
enquire.register('(min-width: 768px)', {
    match: function() {
        console.log('match');
        init();
        desktopVersion();
        // char_mobile.html('');
        //    char_desktop.html(char_desktop_content);
    },

    unmatch: function() {
        console.log('unmatch');
        galleryBtn.off('click');
        character_btn.off('click');
        // char_mobile.html(char_mobile_content);
        // char_desktop.html('');
    }
});
//Json data ***********************************************************************
function init() {
    $.ajax({
        type: 'GET',
        url: 'js/game-data.json',
        dataType: 'json',

        success: function(data) {
            charactersData = data.Characters;
            galleryData = data.Gallery;
        },

        error: function(data) {;
            console.log("ERROR: Seems to be there's a problem with the information we want to pull up");
        }
    });
}

// Desktop Version ***********************************************************************

function desktopVersion() {

  // nav-scroll ///////////////////////////////////////////////////////////////////////////////////

  $('.game-nav a').click(function(){  
    $('html, body').stop().animate({
      scrollTop: $( $(this).attr('href') ).offset().top - -10
    }, 800);
    return false;
  });
    //CHARACTERS ***********************************************************************
    character_btn.on("click", function() {
        char_id = $(this).attr('id');
        position = char_id;
        detailsGenerator(position);

        $("#left").on("click", function() {
            char_id--;
            if (char_id == -1) {
                char_id = 3;
            }
            detailsGenerator(char_id);
        });

        $("#right").on("click", function() {
            char_id++;
            if (char_id == 4) {
                char_id = 0;
            }
            detailsGenerator(char_id);
        });

        $('#hide').on("click", function() {
            displayer('hide');
        });

        function detailsGenerator(position) {
            var content = "<img src=" + charactersData[position].img + "> <h2>" + charactersData[position].name + "</h2><p>" + charactersData[position].history + "</p>";
            individual_details.html(content);
            displayer('show');
        }

        function displayer(option) {
            if (option == 'show') {
                overall_char_container.removeClass('hidden');
            } else {
                overall_char_container.addClass('hidden');
            }
        }
    });
    //GALLERY ***********************************************************************
    galleryBtn.on("click", function() {
        var number = this.id;
        var full_image = '';
        $('.modal').css("display", "block");

        for (var i = 0; i < galleryData.length; i++) {
            if (number == galleryData[i].number) {
                full_image = "<img src='img/icons/previous.png' class='previous' id='previous'><img id='full-picture' class='full-picture' src='" + galleryData[i].img + "'><img src='img/icons/close.png' class='exit' id='closePopUp'></div><img class='next' src='img/icons/next.png' id='next'>";
            }
        }
        $('#show-fullimage').html(full_image);

        $("#previous").on("click", function() {
            index--;
            if (index < 0) {
                index = galleryData.length - 1;
            }
            $('#full-picture').attr("src", galleryData[index].img);
        });

        $("#next").on("click", function() {
            index++;
            if (index >= galleryData.length) {
                index = 0;
            }
            $('#full-picture').attr("src", galleryData[index].img);
        });

        $("#closePopUp").on("click", function() {
            $('.modal').css("display", "none");
        });
    });
}
// Mobile Version

// Close Tag ///////////////////////////////////////////////////////////////////////////////////

  $('.close').click(function() {
    var input_radio = this.parentNode.parentNode.firstChild.nextSibling;
    input_radio.checked = false;
  });

// Lang ///////////////////////////////////////////////////////////////////////////////////

  var list_lang_item = $(".list-lang-item");
  $("#list-lang").click(function(){
    for (var i = 0; i < list_lang_item.length; i++) {
      list_lang_item.addClass(function( i ) {
        return "list-lang-item position" + i;
      });
    };
  });

  $("#close").click(function(){
    for (var m = 0; m < list_lang_item.length; m++) {
      list_lang_item.removeClass(function( m ) {
        return "list-lang-item position"+m;
      });
      list_lang_item.addClass("list-lang-item")
    };
  });