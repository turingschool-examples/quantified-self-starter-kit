require('./stylesheets/index')
var sheets = require('./styles.css');
const $ = require('jquery')
//var Food = require('../models/food')

class Food {
	constuctor(attrs) {
		this.id = attrs.id
		this.name = attrs.name
		this.calories = attrs.calories
	}
}

	debugger;
$( document ).ready(function() {


// function Food(food) {
//   this.id = food.id;
//   this.name = food.name;
//   this.calories = food.calories;
// }

// Food.prototype.toHTML = function() {
//   return `<div class="food-body"`
// }
 });

$('#new_foods').submit(function(event) {
	event.preventDefault();

	var foodItem = {};
	foodItem.name = $("#food_name").val()
	foodItem.calories = $("#food_calories").val()

	return $.ajax({
	  type: "POST",
	  url: 'http://localhost:3000/api/v1/foods',
	  data: { food: foodItem },
	})
	 .done(function (data) {
     debugger
     var newFood = new Food(data)
    return newFood.toHTML()
   })
	 .fail(function(error) {
		debugger
	});
})


Food.getAllFoodsToHTML = function() {
  return $.ajax({
    type: "GET",
    url: 'http://localhost:3000/api/v1/foods',
    data: { food: foodItem },
  })
  .then(function(data) {
    return data.map(function(food_item) {
      return new Food(food_item);
    })
  })
  .then(function(data) {
    return data.map(function(food_item) {
      return food_item.toHTML()
    })
  })
}
