const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";


$(document).ready(function() {
  getAllMeals()
  renderFoodsTable()
  addFoodToMeal()
})

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
  }).then(function(data) {
    data.forEach(function(meal) {
      var sum = 0
      meal.foods.forEach(function(food) {
        sum += food.calories
        $(`#${meal.name.toLowerCase()} #foods-table-body`).append('<tr><td class="food-name-cell">' + food.name + '</td><td class="calorie-cell">' + food.calories + '</td></tr>');
      })
      // $(`#${meal.name.toLowerCase()}`).children('tfoot').empty()

      $(`#${meal.name.toLowerCase()}`).children('tfoot').append('<tr id="totalColumn"><td class="totalcal" id="breakfast">Total Calories:</td><td class="meal-totals">' + sum + '</td></tr>');
      $(`#${meal.name.toLowerCase()}`).children('tfoot').append(`<tr id="remainingColumn"><td class="remainingCals ${meal.name.toLowerCase()}"> Remaining Calories:</td><td class="remaining-totals"> ${goalKey[meal.name] - sum} </td></tr>`);
    })
      displayAddButtons(data);
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
  $('#totals').append(
    `<tr>
      <td>Goal Calories </td>
       <td>2000 </td> </tr>
    <tr>
      <td>Calories Consumed </td>
      <td> ${allMealTotalCals()}</td>
      </tr>
    <tr>
    <td>Remaining Calories </td>
      <td class="remaining-totals"> ${2000 - allMealTotalCals()}  </td>
    </tr>
    `
  )
  renderRemainingColor();
}

function allMealTotalCals () {
  var allCals = totalCalories();
  return allCals

}

function totalCalories() {
  var sum = 0;
  var arr = document.getElementsByClassName('meal-totals')

  $.each(arr, function(index,val) {
    sum += (parseInt(val.innerHTML))
  })
  return sum
}

function renderFoodsTable() {
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  }).done(function(foods) {
    renderFoods(foods)
  }).fail(function() {
    handleError();
  })
}


function renderFoods(foods) {
  $('#foods-table-headers').append("<h2 class='text-center'>Foods</h2><br>"
                            + "<p>Add selected to:</p>")
  $('#foods-table').append("<table class='table'>"
                    + "<thead><tr><th></th><th>Name</th><th>Calories</th></tr></thead><tbody>"
                    + createFoodRows(foods)
                    + "</tbody></table>")
}

function createFoodRows(foods) {
  var rows = "";
  $.each(foods, function(index, food) {
    rows += `<tr><td><input type='checkbox' name='food' value='food' foodId=${food["id"]}></td><td>${food["name"]}</td><td>${food["calories"]}</td></tr>`
  })
  return rows
}

function displayAddButtons(meals) {
  $.each(meals, function(index, meal) {
    $('#add-selected').append(`<button type='button' name='button' class='btn btn-primary' mealId="${meal["id"]}">
    ${meal["name"]}</button>`)
  })
}

function addFoodToMeal() {
  $('#add-selected').on('click', function(event){
    var foodId = event.target.getAttribute("foodId")
    var mealId = event.target.getAttribute("mealId")
    var checked = $('input:checked')
    $.each(checked, function(index, food) {
      $.ajax({
        url: API + `/api/v1/meals/${mealId}/foods/${food.getAttribute("foodId")}`,
        method: "POST",
      }).then(function() {
        displayDiary() // clears out meals table , retrieves new meals through ajax
      }).then(function() {
        reRenderFoods()
      }).fail(function() {
        handleError();
      })
    })
  })
}

function displayDiary () {
  $.ajax({
    url: API + '/api/v1/meals',
    method: "GET",
  }).then(function(meals) {
    clearElements()
  }).then(function() {
    getAllMeals()
  }).fail(function(){
    handleError();
  })
}

function clearElements () {
  $('.meal-table').children('tbody').empty()
  $('#totals').children().html('')
  $('#add-selected').children().remove();
  $('tfoot').empty()
}

function reRenderFoods() {
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  }).done(function(foods) {
    clearFoods()
    renderFoods(foods)
  }).fail(function() {
    handleError();
  })
}

function clearFoods() {
  $('#foods-table').html('')
  $('#foods-table-headers').html('')
}

var handleError = function(error) {
  console.log(error.statusText);
  console.log(error.responseText);
}
