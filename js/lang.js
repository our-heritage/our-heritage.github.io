// IDIOMAS / MOBILE //////////////////////////////////////////////////////////////////////////////////

var MenuLang=(function(){
  var list_lang=document.getElementById("list-lang");
  var list_lang_item=document.getElementsByClassName("list-lang-item");
    var selected=document.getElementsByClassName("selected")[0];
    var close=document.getElementById("close");
    close.addEventListener('touchstart', function(e){
        console.log("Hola");
        hideMenu();
    }, false)
    list_lang.addEventListener('touchstart', function(e){
       showMenu();
    }, false)
    function showMenu(){
        for (var i = 0; i < list_lang_item.length; i++) {   
            list_lang_item[i].className="list-lang-item position"+i;
            if(list_lang_item[i].innerHTML === selected.innerHTML){
                list_lang_item[i].className="list-lang-item selected position"+i;
            }   
        };
    }
    function hideMenu(){
        for (var i = 0; i < list_lang_item.length; i++) {   
            list_lang_item[i].className="list-lang-item";
            if(list_lang_item[i].innerHTML === selected.innerHTML){
                list_lang_item[i].className="list-lang-item selected";
            }  
        };
    }
    return{
        hideMenu:hideMenu
    }
})(); 