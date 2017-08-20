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
  `<td><a><img src="public/trash_can.png" class="trash-can" alt="a trash can" /></a></td></tr>`
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
    debugger
  })
}

Food.allFoodsToHTML = function() {
  return this.getAllFoods()
  .then(function(foodList) {
    return foodList.map(function(food) {
      return new Food(food);
    }).sort(function(a, b) {
      return b.id - a.id;
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

Food.delete = function(foodID) {
  return $.ajax({
    url: `http://localhost:3000/api/v1/foods/${foodID}`,
    type: 'DELETE'
  }).done(function() {
      getAllFoods();
    });
}

$('#new_foods').submit(function(event) {
	event.preventDefault();

  if (!$('#food_name').val()) {
    $('#name-input').text('Error: Please enter a name')
  }

  if (!$('#food_calories').val()) {
    $('#calories-input').text('Error: Please enter a calorie amount')
  }

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
    $(newFood.toHTML()).prependTo(('#foods_table'))
   })
	 .fail(function(error) {

	});
})

$('foods_table').on('click', '.trash-can', function(event) {
  var foodID = parseInt(this.id);
  Food.delete(foodID);
});

$( document ).ready(function() {

  Food.allFoodsToHTML()
  .then(function(foodHTML) {
    $('#foods_table').html(foodHTML)
  })
})
