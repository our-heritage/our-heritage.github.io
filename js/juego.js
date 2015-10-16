var index = 0;
var position = 0;
var overal_details = document.getElementById('char_details');
var details = document.getElementById('details');
var charactersData = '';
var imgs_array = "";

//On window load
(function(window){
	$.ajax({
		type:'GET',
		url: 'js/game-data.json',
		dataType:'json',

			success: function(data) {
				charactersData = data.Characters;
				imgs_array = data.Gallery;
				printImgs();
			},

			error: function(data){
				console.log("ERROR: Seems to be there's a problem with the information we want to pull up");
			}
		});
})(window);

// GALLERIA //////////////////////////////////////////////////////////////////////////////////
function printImgs(){
	var listDisplay = "";
	for(var i = 0; i < imgs_array.length; i++){
		listDisplay += '<li class="pic-'+imgs_array[i].number+'" onclick="showModal('+imgs_array[i].number+')"><img src="'+imgs_array[i].img+'"></li>';
	}
	document.getElementById("container").innerHTML = '<ul class="gallery">'+listDisplay+'</ul>';
}

function showModal(number){
	var full_image = "";
	document.getElementsByClassName("modal")[0].style.display = "block";
	for(var i = 0; i < imgs_array.length; i++){
		if(number == imgs_array[i].number){
			full_image = '<div class="previous" onclick="previous()"></div><img id="full-picture" class="full-picture" src="'+imgs_array[i].img+'"><div class="exit" onclick="closeModal()"></div><div class="next" onclick="next()"></div>';
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

function closeModal(){
	document.getElementsByClassName("modal")[0].style.display = "none";
}

function next(){
	index++;
		if (index >= imgs_array.length) {
			index = 0;
		}
		document.getElementById("full-picture").setAttribute("src", imgs_array[index].img);
}


//CHARACTERS ///////////////////////////////////////////////////////////////////

function detailsGenerator(new_position) {
	console.log('hola personajes');
	position = new_position;
	var content = "<img src="+charactersData[position].img+"> <h2>"+charactersData[position].name+ "</h2><p>"+charactersData[position].history+"</p>";
	details.innerHTML = content;
	displayer('show');
}

function displayer(option) {
	if(option == 'show') {
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
