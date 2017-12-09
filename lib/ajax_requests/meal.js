const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";
const mainMealResponse = require("../response-handlers/meal-responses")

$(document).ready(function() {
  getAllMeals()
  renderFoodsTable()
  addFoodToMeal()
})



function getAllMeals() {
  $.ajax({
    url: API + '/api/v1/meals',
    method: 'GET',
  }).then(function (data) {
      mainMealResponse.mainMealResponse(data);
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

// function addFoodToMeal() {
//   $('#add-selected').on('click', function(event){
//     var foodId = event.target.getAttribute("foodId")
//     var mealId = event.target.getAttribute("mealId")
//     var checked = $('input:checked')
//     $.each(checked, function(index, food) {
//       $.ajax({
//         url: API + `/api/v1/meals/${mealId}/foods/${food.getAttribute("foodId")}`,
//         method: "POST",
//       }).then(function() {
//         displayDiary() // clears out meals table , retrieves new meals through ajax
//       }).then(function() {
//         reRenderFoods()
//       }).fail(function() {
//         handleError();
//       })
//     })
//   })
// }

function addFoodToMeal() {
  $('#add-selected').on('click', function(event){
    var foodId = event.target.getAttribute("foodId")
    var mealId = event.target.getAttribute("mealId")
    var checked = $('input:checked')
    var promiseArray = []
    for (var i = 0; i < checked.length; i++) {
      promiseArray.push(updateMeal(mealId, checked[i]))
    }
// debugger
    Promise.all(promiseArray).then(function() {
        displayDiary() // clears out meals table , retrieves new meals through ajax
      }).then(function() {
        reRenderFoods()
      }).fail(function() {
        handleError();
      })
    })
  }



function updateMeal(mealId, foodsId) {
  return $.ajax({
      url: API + `/api/v1/meals/${mealId}/foods/${foodsId.getAttribute("foodId")}`,
      method: "POST",
    }).fail(function() {
      handleError();
    })
  }


export function displayDiary () {
  $.ajax({
    url: API + '/api/v1/meals',
    method: "GET",
  }).then(function() {
    clearElements()
  }).then(function() {
    getAllMeals()
  }).fail(function(){
    handleError();
  })
}

function clearElements () {
  // debugger
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

export function handleError(error) {
  console.log(error.statusText);
  console.log(error.responseText);
}

// var handleError = function(error) {
//   console.log(error.statusText);
//   console.log(error.responseText);
// }

// module.exports = {displayDiary, handleError}
