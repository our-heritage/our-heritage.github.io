(function(window){
	 $.ajax({
	    type:'GET',
	    url: 'js/characters.json',
	    dataType:'json',

	    success: function(data) {
	      jsonData = data.characters;
	    },

	    error: function(data){
	      console.log("ERROR: Seems to be there's a problem with the information we want to pull up");
    	}
  	});
})(window);

var position = 0;
var overal_details = document.getElementById('char_details');
var details = document.getElementById('details');
var jsonData = '';

function detailsGenerator(new_position) {
	position = new_position;
	var content = "<img src="+jsonData[position].img+"> <h2>"+jsonData[position].name+ "</h2><p>"+jsonData[position].history+"</p>";
	details.innerHTML = content; 
	displayer('show');
}

function displayer(option) {
	if (option == 'show') {
		overal_details.classList.remove('hidden');
	} else {
		overal_details.classList.add('hidden');
	}
}

function slider(direction){
	if(direction == 'left'){
		position--;
		if(position == -1){
			position = 3 ;
		}
		detailsGenerator(position);
	} else {
		position++ ;
		if (position == 4) {
			position = 0;
		}
		detailsGenerator(position);
	}
}
var Gallery = (function(){
	var imgs_array = "";
	var index = 0;

	function loadJSON(){
		var xobj = new XMLHttpRequest();
		xobj.onreadystatechange = function(){
			if (xobj.readyState === 4 && xobj.status == 200){
		  		var jsonObj = JSON.parse(xobj.responseText);
		  		imgs_array = jsonObj.Gallery;
				printImgs(imgs_array);
			}
		}
		xobj.open("GET", "js/gallery-imgs.json", true);
		xobj.send();
	};
	
	function printImgs(){
		var listDisplay = "";
		for(var i = 0; i < imgs_array.length; i++){
			listDisplay += '<li class="pic-'+imgs_array[i].number+'" onclick="Gallery.showFullImg('+imgs_array[i].number+')"><img src="'+imgs_array[i].img+'"></li>';
		}
		 document.getElementById("container").innerHTML = '<ul class="gallery">'+listDisplay+'</ul>';
	}

	loadJSON();

	function showFullImg(number){
		var full_image = "";
		document.getElementsByClassName("popup")[0].style.display = "block";
		for(var i = 0; i < imgs_array.length; i++){
			if(number == imgs_array[i].number){
				full_image = '<div class="previous" onclick="Gallery.previous()"></div><img id="full-picture" class="full-picture" src="'+imgs_array[i].img+'"><div class="exit" onclick="Gallery.closePopUp()"></div><div class="next" onclick="Gallery.next()"></div>';
			}
		}
		document.getElementById("show-fullimage").innerHTML = full_image;
	}

	function previous(){
		index--;
	    if (index < 0) {
	        index = imgs_array.length-1;
	    }
	    document.getElementById("full-picture").setAttribute("src", imgs_array[index].img);
	}

	function closePopUp(){
		document.getElementsByClassName("popup")[0].style.display = "none";
	}

	function next(){
		index++;
	    if (index >= imgs_array.length) {
	        index = 0;
	    }
	    document.getElementById("full-picture").setAttribute("src", imgs_array[index].img);
	}

	return{
		showFullImg:showFullImg,
		previous:previous,
		closePopUp:closePopUp,
		next:next
	}
})();