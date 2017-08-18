require('./stylesheets/index')
var $ = require('jquery')
var sheets = require('./styles.css');
var Food = require('../models/food')

$( document ).ready(function() {

function Food(food) {
  this.id = food.id;
  this.name = food.name;
  this.calories = food.calories;
}

// Food.prototype.toHTML = function() {
//   return `<div class="food-body"`
// }

// var FormEvents = {
// 	run: function() { console.log("hi!!!"); }
// };

// window.FormEvents = FormEvents;
 });

$('#new_foods').submit(function(event) {
	event.preventDefault();

	var data = {};
	data.name = $("#food_name").val()
	data.calories = $("#food_calories").val()

	return $.ajax({
	  type: "POST",
	  url: 'http://localhost:3000/api/v1/foods',
	  data: { food: data },
	}) 
	 .done(function (data) {
     debugger
   })
	 .fail(function(error) {
		debugger
	});
})
