// Gallery / Swipe //////////////////////////////////////////////////////////////////////////////////

var content_swipe = document.getElementById('gallery');
var item=document.getElementsByClassName('slider-content');
var size_item=item.length-1;
var title="1/"+item.length;
var startx=0;
var dist=0;
var cont=0;
var num=1;
var touchobj;
function sliderSwipe(){
    content_swipe.addEventListener('touchstart', function(e){
        touchobj=e.changedTouches[0];
        startx = parseInt(touchobj.clientX);
        e.preventDefault();
    }, false)
    content_swipe.addEventListener('touchmove', function(e){
        touchobj=e.changedTouches[0];
        dist = parseInt(touchobj.clientX) - startx;
    }, false)
    content_swipe.addEventListener('touchend', function(e){
        touchobj=e.changedTouches[0];
        if(dist > 0){
            if(cont == 0){
                document.getElementsByClassName('first')[0].className="slider-content";
                document.getElementsByClassName("slider-content")[size_item].className="slider-content first";
                title=(size_item+1)+'/'+item.length;
                num=5;
                cont=size_item;
            }else{
                document.getElementsByClassName('first')[0].className="slider-content";
                document.getElementsByClassName('slider-content')[cont-1].className="slider-content first";
                title=(num-1)+'/'+item.length;
                num=num-1;
                cont=cont-1;
            }
        }else{
            if(cont==size_item){
                document.getElementsByClassName('first')[0].className="slider-content";
                document.getElementsByClassName("slider-content")[0].className="slider-content first";
                title='1/'+item.length;
                num=1;
                cont=0;
            }else{
                document.getElementsByClassName('first')[0].className="slider-content";
                document.getElementsByClassName('slider-content')[cont+1].className="slider-content first";
                title=(num+1)+'/'+item.length;
                num=num+1;
                cont=cont+1;
            }
        }
        document.getElementById("counter").innerHTML='<p class="title">'+title+'</p>';
        e.preventDefault()
    }, false)
     document.getElementById("counter").innerHTML='<p class="title">'+title+'</p>';
};
sliderSwipe();