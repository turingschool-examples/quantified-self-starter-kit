const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";

function getAllMeals() {
  $.ajax({
    url: API + '/api/v1/meals',
    method: 'GET',
  }).done(function(data) {
    data.forEach(function(meal) {
      meal.foods.forEach(function(food) {
        $(`#${meal.name.toLowerCase()} #foods-header`).after('<tr><td class="food-name-cell">' + food.name + '</td><td class="calorie-cell">' + food.calories + '</td></tr>');
      })
    })
  }).fail(function(){
    handleError();
  })
};

function getBreakfastMealCalories() {
  var target = document.getElementById('breakfast');
  var items = $('#breakfast.calorie-cell');
  var sum   = 0;
  for(var i = 0; i < items.length; i++) {
    return sum += parseInt(items[i].value)
  }
  // console.log(items)
  // console.log(sum)
  $('#breakfast-cals').after('<tr><td class="breakfast-totals' + sum + '</td></tr>')
}


var handleError = function(error) {
  console.log(error.statusText);
  console.log(error.responseText);
}

getAllMeals();
getBreakfastMealCalories();
