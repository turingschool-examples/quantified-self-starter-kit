require('./stylesheets/index')
var sheets = require('./styles.css');
const $ = require('jquery')
//var Food = require('../models/food')

function Food(food) {
	this.id = food.id;
	this.name = food.name;
	this.calories = food.calories;
}

Food.prototype.toHTML = function() {
  return `<tr class="food_row">` +
  `<td class="food-name" data-id="${this.id}">${this.name}</td>`+
  `<td class="food_calories">${this.calories}</td>`+
  `<td><img src="public/trash_can.png" class="trash-can" alt="traaaash caaan" /></td></tr>`
}

Food.prototype.toHTMLDiary = function(data) {
  return `<tr class="food_row">` +
  `<td class="food-name" data-id="${this.id}">${this.name}</td>`+
  `<td class="food_calories">${this.calories}</td>`+
  `<td><input class="checkbox" type="checkbox"</td></tr>`
}

Food.getAllFoods = function() {
  return $.ajax({
    type: "GET",
    url: 'http://localhost:3000/api/v1/foods',
    dataType:"json",
  })
  .done(function(data) {
    return data;
  })
  .fail(function(error) {
    console.log(error)
  })
}
Food.allFoodsToHTML = function() {
  return this.getAllFoods()
  .then(function(foodList) {
    return foodList.map(function(food) {
      return new Food(food);
    })
  })
  .then(function(foodList) {
    return foodList.map(function(food) {
      if($('.foods_table').length) {
        // debugger
        return food.toHTML();
      } else {
        // debugger
        return food.toHTMLDiary();
      }
      // return food.toHTML();
    })
  })
}

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
     var newFood = new Food(data)
    $(newFood.toHTML()).appendTo(('#foods_table'))
   })
	 .fail(function(error) {
		debugger
	});
})

$( document ).ready(function() {

  Food.allFoodsToHTML()
  .then(function(foodHTML) {
    $('#foods_table').html(foodHTML)
  })
})

module.exports = Food
