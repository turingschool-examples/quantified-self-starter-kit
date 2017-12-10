const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";
import {displayDiary, handleError, totalCalories} from '../ajax_requests/meal'

const goalKey = {
  Breakfast: 400,
  Lunch: 600,
  Dinner: 800,
  Snack: 200
}

export function mainMealResponse(data) {
  data.forEach(function(meal) {
    var sum = 0
    meal.foods.forEach(function(food) {
      sum += food.calories
      $(`#${meal.name.toLowerCase()} tbody.foods-table-body`).append(`<tr data-id=${food.id}><td class="food-name-cell">` + food.name + '</td><td class="calorie-cell">' + food.calories + '</td><td><img class="delete-icon" src="https://image.flaticon.com/icons/svg/12/12145.svg"/></td></tr>');
      mealFoodListener(food.id, meal);
    })


    $(`#${meal.name.toLowerCase()}`).children('tfoot').append('<tr id="totalColumn"><td class="totalcal" id="breakfast">Total Calories:</td><td class="meal-totals">' + sum + '</td></tr>');
    $(`#${meal.name.toLowerCase()}`).children('tfoot').append(`<tr id="remainingColumn"><td class="remainingCals ${meal.name.toLowerCase()}"> Remaining Calories:</td><td class="remaining-totals"> ${goalKey[meal.name] - sum} </td></tr>`);
  })
}



export function mealFoodListener(foodId, meal) {
  $(`#${meal.name.toLowerCase()} [data-id=${foodId}] .delete-icon`).on('click', function(event) {
    var item = $(event.target)
    $.ajax({
      url: API + `/api/v1/meals/${meal.id}/foods/${foodId}`,
      method: 'DELETE',
    }).then(function() {
      item.parent().parent().remove();
      displayDiary();
    }).fail(function() {
      handleError();
    })
  })
}

export function totalsTable() {
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

export function renderRemainingColor() {
    $(`td.remaining-totals:contains('-')`).addClass('red').removeClass('green')
    $(`td.remaining-totals:not(:contains('-'))`).addClass('green').removeClass('red')
}

export function renderFoods(foods) {
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

export function displayAddButtons(meals) {
  $.each(meals, function(index, meal) {
    $('#add-selected').append(`<button type='button' name='button' class='btn btn-primary' mealId="${meal["id"]}">
    ${meal["name"]}</button>`)
  })
}

export function clearElements () {
  $('.meal-table').children('tbody').empty()
  $('#totals').children().html('')
  $('#add-selected').children().remove();
  $('tfoot').empty()
}


export function clearFoods() {
  $('#foods-table').html('')
  $('#foods-table-headers').html('')
}
