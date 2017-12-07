const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";

const goalKey = {
  Breakfast: 400,
  Lunch: 600,
  Dinner: 800,
  Snack: 200
}

function mainMealResponse(data) {
  data.forEach(function(meal) {
    // debugger
    var sum = 0
    meal.foods.forEach(function(food) {
      sum += food.calories
      $(`#${meal.name.toLowerCase()} #foods-header`).after('<tr><td class="food-name-cell">' + food.name + '</td><td class="calorie-cell">' + food.calories + '</td><td>              <img class="delete-icon" src="https://raw.githubusercontent.com/mdevoe12/quantified-self/master/images/minus-icon.png"/></td></tr>');
    })


    $(`#${meal.name.toLowerCase()}`).children('tfoot').append('<tr id="totalColumn"><td class="totalcal" id="breakfast">Total Calories:</td><td class="meal-totals">' + sum + '</td></tr>');
    $(`#${meal.name.toLowerCase()}`).children('tfoot').append(`<tr id="remainingColumn"><td class="remainingCals ${meal.name.toLowerCase()}"> Remaining Calories:</td><td class="remaining-totals"> ${goalKey[meal.name] - sum} </td></tr>`);
  })
}


module.exports = {mainMealResponse}
