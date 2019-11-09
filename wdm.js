
function picker(wardrobe, styles, weathers){

	var result = []


	var filteredShoes = wardrobe.shoes.filter(function(elem){
			return elem.style.includes(styles) && elem.weather_conditions.includes(weathers) && elem.clean
	})

	var filteredUpperware = wardrobe.upperware.filter(function(elem){
			return elem.style.includes(styles) && elem.weather_conditions.includes(weathers) && elem.clean
	})

	var filteredMiddlewear = wardrobe.middlewear.filter(function(elem){
			return elem.style.includes(styles) && elem.weather_conditions.includes(weathers) && elem.clean
	})


	result[2] = filteredShoes[Math.floor(Math.random() * Math.floor(filteredShoes.length))];
	result[0] = filteredUpperware[Math.floor(Math.random() * Math.floor(filteredUpperware.length))];
	result[1] = filteredMiddlewear[Math.floor(Math.random() * Math.floor(filteredMiddlewear.length))];


	return result;


}



function addClothes (wardrobe, category, name, style, weather_conditions, img) {

	var obj = {};
	obj.name = name;
	obj.style = style;
	obj.weather_conditions = weather_conditions;
	obj.clean = true;
	obj.img = img;
	obj.id = Math.floor(Math.random() * Math.floor(500));
	wardrobe[category].push(obj)

}



function displayWardrobe(obj){
	var displayArray = [];
	for(var key in obj){
		for (var i = 0; i < obj[key].length; i++) {
			displayArray.push(obj[key][i].img);

		}
	}
	return displayArray
	
}

function markAsClean (obj,cat,id){

	return obj[cat]["id"].clean = true;

}

function each(array, func) { 
   for (var i = 0; i < array.length; i++) { 
         func(array[i], i); 
   } 
}

function displayDirtyInCategory(obj, key){

	var arr = [];

	for (var i = 0; i < obj[key].length; i++) {

		if (obj[key][i].clean === false){
			arr.push(obj[key][i].img)
		}
	}

	console.log(arr)

	return arr;

}

//////JQUERY


var clothingWardrobe = wardrobe, style, weather, cleaning;
	

$( "body" ).on( "click", "#dressMe", function() {

	var arrPick = picker(clothingWardrobe, style, weather);

	$("#displayerDiv").html('')


	if (clothingWardrobe !== undefined && style !== "style" && weather !== "weather"){
		for (var i = 0; i < arrPick.length; i++) {
			arrPick[i] !== undefined ? $("#displayerDiv").append("<img src="+arrPick[i].img+ " alt=" + arrPick[i].img + " height=200  width=200 >" ) : $("#displayerDiv").append("<img src=DoTheLaundry.png alt=DoTheLaundry.png height=200 width=200>" );
		}
	
	}	
})

$( "body" ).on( "click", "#Display", function() {

	var displayArray = displayWardrobe(clothingWardrobe)

	$("#displayerDiv").html('')

	if (clothingWardrobe !== undefined){

		for (var i = 0; i <displayArray.length; i++) {
			displayArray[i] !== undefined ? $("#displayerDiv").append("<img src=" + displayArray[i] + " alt=" + displayArray[i] + " height=200  width=200 >" ) : $("#displayerDiv").append("<img src=DoTheLaundry.png alt=DoTheLaundry.png height=200 width=200>" );
		}

	}


})

// this function keeps track of all changes that take place

$("body").on("change", "select", function() {

	var name = $(this).attr("name");
	var val = $(this).val();


	console.log("name is " + name, "value is " + val)

	switch (name) {
	  case 'weather':
		weather = val
	    break;
	  case 'style':
	    style = val;
	    break;
	  case 'db':
	    clothingWardrobe = val;
	    break;

	  case "category":
	  	var arr = displayDirtyInCategory(clothingWardrobe, val);
	  	$("#cleaningDiv").html("");

		for (var i = 0; i < arr.length; i++) {

			$("#cleaningDiv").append("<img src= " + arr[i] + " id= "+ i + " alt= " + arr[i] + " height=200  width=auto " + ">")
		}

		break;


	}

})

var wzr = [];
var stlz = [];

$("body").on("change", "input", function() {

	var className = $(this).attr("class");
	var val = $(this).val();

	switch (className) {
	  case 'wzr1':
		wzr.push(val)
	    break;
	  case 'stl1':
	    stlz.push(val);
	    break;
	}

})


//Marks an immage as clean after the user clicks on it

$("body").on("click", "img", function() {

	var id = $(this).attr("id");
	var src = $(this).attr("src")

	$("#"+id).hide()

	for(key in wardrobe){

		for (var i = 0; i < wardrobe[key].length; i++) {

			if (wardrobe[key][i].img === src){

				wardrobe[key][i].clean = true;
				
			}

		}

	}

})



// gets out the form for inputting attributes of the clothes. Note: it can be done in html and toggle here. 

$( 'body' ).on('click', '#addClothes', function (){ 


	$('#inputClothes').html('');
	$('#inputClothes').append('Name of Item: <input type="text" id="name" placeholder="enter name..." ><br><br></input><br><strong>Category:<input type="radio" name="category1" value="upperwear"> Upperwear<input type="radio" name="category1" value="middlewear"> Middlewear<input type="radio" name="category1" value="shoes"> Shoes<br><br>')
	$('#inputClothes').append('Worn in:<input type="checkbox"  class=wzr1 name="weath1" value="windy">Windy weather<input type="checkbox" name="weath2" class=wzr1 value="cloudy">Cloudy weather <input type="checkbox" name="weath3" class=wzr1 value="sunny">Sunny weather<input type="checkbox" name="weath4" class=wzr1 value="rainy">Rainy weather <input type="checkbox" name="weath5" class=wzr1 value="cold">Cold weather<br><br>');
	$('#inputClothes').append('Worn in:<input type="checkbox" name="style1" class=stl1 value="formal">Formal settings<input type="checkbox" name="style2" class=stl1 value="smart">Smart settings<input type="checkbox" name="style3" class=stl1 value="casual">Casual settings<br><br>');
	$('#inputClothes').append('<button id=submit>Submit</button><br><br>')
	$('#nonAdd').toggle()
	$('#adding').toggle()

})





///processes the responses and adds them to the database


$('body').on('click', '#submit', function(){

	$('#adding').hide()
	$('#nonAdd').show()

	addClothes (wardrobe, $("input:checked").val(), $('#name').val() , wzr, stlz, $('#name').val()+".jpg")

})

//add more images
//change the mark clean stuff










