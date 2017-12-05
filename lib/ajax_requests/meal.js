const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";

const goalKey = {
  Breakfast: 400,
  Lunch: 600,
  Dinner: 800,
  Snack: 200
}

function getAllMeals() {
  $.ajax({
    url: API + '/api/v1/meals',
    method: 'GET',
  }).done(function(data) {
    data.forEach(function(meal) {
      console.log(data.meals)
      var sum = 0
      meal.foods.forEach(function(food) {
        sum += food.calories
        $(`#${meal.name.toLowerCase()} #foods-header`).after('<tr><td class="food-name-cell">' + food.name + '</td><td class="calorie-cell">' + food.calories + '</td></tr>');
      })
      $(`#${meal.name.toLowerCase()}.totalcal`).after('<td class="meal-totals">' + sum + '</td>');
      $(`.remainingCals.${meal.name.toLowerCase()}`).after(`<td class="remaining-totals"> ${goalKey[meal.name] - sum} </td>`);
    })
    renderRemainingColor();
    totalsTable();
  }).fail(function(){
    handleError();
  })
};


function renderRemainingColor() {
    $(`td.remaining-totals:contains('-')`).addClass('red').removeClass('green')
    $(`td.remaining-totals:not(:contains('-'))`).addClass('green').removeClass('red')
}

function totalsTable() {
  allMealTotalCals();

}

function allMealTotalCals () {
  var allCals = totalCalories()
}

function totalCalories() {
  var sum = 0;
  var arr = document.getElementsByClassName('meal-totals')
console.log(arr);
  $.each(arr, function(index,val) {
    sum += (parseInt(val.innerHTML))
  })

  return sum
}



var handleError = function(error) {
  console.log(error.statusText);
  console.log(error.responseText);
}

getAllMeals();
renderRemainingColor();
totalsTable();
allMealTotalCals();
totalCalories();
