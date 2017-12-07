const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";
const displayDiary = require("../ajax_requests/meal")
const handleError = require("../ajax_requests/meal")

const goalKey = {
  Breakfast: 400,
  Lunch: 600,
  Dinner: 800,
  Snack: 200
}

function mainMealResponse(data) {
  data.forEach(function(meal) {
    var sum = 0
    meal.foods.forEach(function(food) {
      sum += food.calories
      $(`#${meal.name.toLowerCase()} #foods-header`).after(`<tr data-id=${food.id}><td class="food-name-cell">` + food.name + '</td><td class="calorie-cell">' + food.calories + '</td><td><img class="delete-icon" src="https://image.flaticon.com/icons/svg/12/12145.svg"/></td></tr>');
      mealFoodListener(food.id, meal);
    })


    $(`#${meal.name.toLowerCase()}`).children('tfoot').append('<tr id="totalColumn"><td class="totalcal" id="breakfast">Total Calories:</td><td class="meal-totals">' + sum + '</td></tr>');
    $(`#${meal.name.toLowerCase()}`).children('tfoot').append(`<tr id="remainingColumn"><td class="remainingCals ${meal.name.toLowerCase()}"> Remaining Calories:</td><td class="remaining-totals"> ${goalKey[meal.name] - sum} </td></tr>`);
  })
}


function mealFoodListener(foodId, meal) {
  $(`#${meal.name.toLowerCase()} [data-id=${foodId}] .delete-icon`).on('click', function(event) {
    var item = $(event.target)
    $.ajax({
      url: API + `/api/v1/meals/${meal.id}/foods/${foodId}`,
      method: 'DELETE',
    }).then(function() {
      item.parent().parent().remove();
      displayDiary.displayDiary();
    }).fail(function() {
      handleError.handleError();
    })
  })
}

module.exports = {mainMealResponse, mealFoodListener}
