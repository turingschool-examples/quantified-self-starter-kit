const $ = require('jquery')
const Food = require("../models/food")

$( document ).ready(function() {
  Food.allFoodsToHTML()
  .then(function(foodHTML) {
    $('#foods-table').html(foodHTML)
  })
})

$('#new-foods').submit(function(event) {
  event.preventDefault()

  if (!$('#food-name').val()) {
    $('#name-input').text('Error: Please enter a name')
  }

  if (!$('#food-calories').val()) {
    $('#calories-input').text('Error: Please enter a calorie amount')
  }

  var foodItem = {};
  foodItem.name = $("#food-name").val()
  foodItem.calories = $("#food-calories").val()

  return $.ajax({
    type: "POST",
    url: 'https://shrouded-headland-61661.herokuapp.com/api/v1/foods',
    data: { food: foodItem },
  })
  .done(function (data) {
    var newFood = new Food(data)
    $(newFood.toHTML()).prependTo(('#foods-table'))
    $('#food-name').val("")
    $('#food-calories').val("")
    $('#name-input').hide()
    $('#calories-input').hide();
  })
  .fail(function(error) {

  });
})

$('#filter-name').keyup(filterFoods)

function filterFoods(){
  let filter = $('#filter-name').val().toLowerCase()
  let foods = $('.food-name')
  for(var i = 0; i < foods.length; i++){
    let foodName = $(foods[i]).text()
    let matchedFilter = foodName.toLowerCase().indexOf(filter) > -1
    foods[i].parentElement.style.display = matchedFilter ? "" : "none"
  }
}

$('.foods-table').on('click', '.trash-can', function(event) {
  event.preventDefault();
  var foodID = parseInt(this.id);
  Food.delete(foodID)
  Food.removeFood(foodID);
})

$('#foods-table').on('focusout', ".food-name", function() {
    var id = this.id
    var name = $(this).text()
    var foodObj = {name: name, id: id}
    Food.editFood(foodObj)
  })

$('#foods-table').on('focusout', '.food-calories', function() {
  var id = this.id
  var calories = $(this).text()
  var foodObj = {id: id, calories: calories}
  Food.editFood(foodObj)
})
