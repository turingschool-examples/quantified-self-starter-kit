var $ = require('jquery')
const Food = require("./models/food")

// $( document ).ready(function() {
//   Food.allFoodsToHTML()
//   .then(function(foodHTML) {
//     $('#foods_table').html(foodHTML)
//   })
// })
//
// $('#new_foods').submit(function(event) {
//   event.preventDefault()
//
//   if (!$('#food_name').val()) {
//     $('#name-input').text('Error: Please enter a name')
//   }
//
//   if (!$('#food_calories').val()) {
//     $('#calories-input').text('Error: Please enter a calorie amount')
//   }
//
//     var foodItem = {};
//     foodItem.name = $("#food_name").val()
//     foodItem.calories = $("#food_calories").val()
//
// 	return $.ajax({
// 	  type: "POST",
// 	  url: 'http://localhost:3000/api/v1/foods',
// 	  data: { food: foodItem },
// 	})
// 	 .done(function (data) {
//      var newFood = new Food(data)
//     $(newFood.toHTML()).prependTo(('#foods_table'))
//     $('#food_name').val("")
//     $('#food_calories').val("")
//     $('#name-input').hide()
//     $('#calories-input').hide();
//    })
// 	 .fail(function(error) {
//
// 	});
// })
//
// $('#filter_name').keyup(filterFoods)
//
// function filterFoods(){
//   let filter = $('#filter_name').val().toLowerCase()
//   let foods = $('.food-name')
//
//   for(var i = 0; i < foods.length; i++){
//     let foodName = $(foods[i]).text()
//     let matchedFilter = foodName.toLowerCase().indexOf(filter) > -1
//     foods[i].parentElement.style.display = matchedFilter ? "" : "none"
//   }
// }
//
// $('.foods_table').on('click', '.trash-can', function(event) {
//   event.preventDefault();
//   var foodID = parseInt(this.id);
//   Food.delete(foodID)
//   Food.removeFood(foodID);
// });
