const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";
import {mainMealResponse, renderRemainingColor, totalsTable, renderFoods, displayAddButtons, clearElements, clearFoods} from '../response-handlers/meal-responses'

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
      mainMealResponse(data);
      displayAddButtons(data);
      renderRemainingColor();
      totalsTable();
    }).fail(function(){
      handleError();
    })
};


export function totalCalories() {
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

function addFoodToMeal() {
  $('#add-selected').on('click', function(event){
    var foodId = event.target.getAttribute("foodId")
    var mealId = event.target.getAttribute("mealId")
    var checked = $('input:checked')
    var promiseArray = []
    for (var i = 0; i < checked.length; i++) {
      promiseArray.push(updateMeal(mealId, checked[i]))
    }
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



export function handleError(error) {
  console.log(error.statusText);
  console.log(error.responseText);
}
