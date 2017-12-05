const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";

function getAllMeals() {
  $.ajax({
    url: API + '/api/v1/meals',
    method: 'GET',
  }).done(function(data) {
    data.forEach(function(meal) {
      var sum = 0
      meal.foods.forEach(function(food) {
        sum += food.calories
        $(`#${meal.name.toLowerCase()} #foods-header`).after('<tr><td class="food-name-cell">' + food.name + '</td><td class="calorie-cell">' + food.calories + '</td></tr>');
      })
      $(`#${meal.name.toLowerCase()}.totalcal`).after('<td class="breakfast-totals">' + sum + '</td>')
    })
  }).fail(function(){
    handleError();
  })
};

var handleError = function(error) {
  console.log(error.statusText);
  console.log(error.responseText);
}

getAllMeals();
// getMealCalories();
