require('./stylesheets/index')
var $ = require('jquery')
var sheets = require('./styles.css');

// var FormEvents = {
// 	run: function() { console.log("hi!!!"); }
// };

// window.FormEvents = FormEvents;
var addFood = $('#new-food').submit(function(event) {
	event.preventDefault();
	console.log(this)

	var food = {};
	food.name = $("#food_name").value
	food.calories = $("#food_calories").value

	$.ajax({
	  type: "POST",
	  url: 'https://shrouded-headland-61661.herokuapp.com/',
	  data: food,
	});

	.
})
