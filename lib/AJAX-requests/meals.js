var $ = require('jquery')
var mealHandler = require('../response-handlers/meals')
var mealURL = 'https://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals'
var foodURL = 'https://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods'

var populateMeals = function () {
  $.getJSON(mealURL)
  .then(mealHandler.populateMeals)
}

var populateFoods = function () {
  $.getJSON(foodURL)
  .then(mealHandler.populateFoods)
}

var deleteFood = function () {
  var eventTarget = $(event.target)
  var foodId = eventTarget.closest('tr').data('food-id')
  var mealId = eventTarget.closest('tr').data('meal-id')
  killFoodsMeal(eventTarget, foodId, mealId)
}

function killFoodsMeal (eventTarget, foodId, mealId) {
  $.ajax({
    url: `https://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`,
    type: 'DELETE',
    dataType: 'json'
  })
  .then(function (data) {
    // alert(data.message)
    mealHandler.deleteHandler(eventTarget)
  })
  .catch(function (error) {
    alert(error.statusText)
  })
}

function addFoodToMeal () {
  var target = $(event.target)
  var mealTable = $(`table.${target[0].name}`)
  console.log("WIP")
}

module.exports = {
  populateMeals,
  deleteFood,
  populateFoods,
  addFoodToMeal
}
