require('./stylesheets/index')
var sheets = require('./styles.css');
const $ = require('jquery')
var host = require('./config').host

function Food(food) {
  this.id = food.id;
  this.name = food.name;
  this.calories = food.calories;
}

Food.prototype.toHTML = function() {
  return `<div class="food-body"`
}

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

  //  $.post(`https://shrouded-headland-61661.herokuapp.com/api/v1/foods`, food)
  // .then(Entry.appendNew)
  // .catch(Entry.handleError)
})

Food.getAllFoods = function() {
  return $.getJSON(`${host}/posts`)
}
