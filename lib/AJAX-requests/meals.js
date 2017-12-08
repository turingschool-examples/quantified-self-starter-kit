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

var addFoodToMeal = function () {
  var target = $(event.target)
  var mealTable = $(`tbody.${target[0].name}`)
  var foodRows = $(':checked').parents('tr')
  var foodsToAdd = []
  var mealId = mealTable.data('id')
  var rowsToAdd = {}
  var caloriesChange = 0
  foodRows.each(function (row) {
    foodsToAdd.push($(this).data('id'))
    rowsToAdd[`${$(this).data('id')}`] = {name: `${$(this).data('name')}`, cals: `${$(this).data('cals')}`}
  })
  var addFoodsPromises = foodsToAdd.map(function (foodId) {
    $.post(`https://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`)
    .then(function (data) {
      mealTable.prepend(`<tr data-meal-id="${mealId}" data-food-id="${foodId}"> <td>${rowsToAdd[foodId].name}</td><td class="cals">${rowsToAdd[foodId].cals}</td><td class="delete-cell"><i class="delete-button fa fa-minus-circle" aria-hidden="true"></i></td> </tr>`)
      caloriesChange += parseInt(rowsToAdd[foodId].cals)
      debugger
    })
  })
  debugger
  Promise.all(addFoodsPromises)
  .then(function () {
    debugger
    updateCalories(caloriesChange, mealTable)
    $(':checked').prop('checked', false)
  })
}

function updateCalories(caloriesChange, mealTable) {
  var calsGoal = mealTable.children('.remaining-cals').children('.cal-rem').data('goal')
  var oldCalsConsumed = $('.total-cals-consumed')[0]
  var oldCalsRemaining = $('.total-cals-remaining')[0]
  var oldMealCalsConsumed = mealTable.children('.total-cals').children('.cal-sum')[0]
  var oldMealCalsRemaining = mealTable.children('.remaining-cals').children('.cal-rem')[0]
  oldCalsConsumed.innerText = parseInt(oldCalsConsumed.innerText) + caloriesChange
  oldCalsRemaining.innerText = parseInt(oldCalsRemaining.innerText) - caloriesChange
  oldMealCalsConsumed.innerText = parseInt(oldMealCalsConsumed.innerText) + caloriesChange
  oldMealCalsRemaining.innerText = parseInt(oldMealCalsRemaining.innerText) - caloriesChange
}

module.exports = {
  populateMeals,
  deleteFood,
  populateFoods,
  addFoodToMeal
}
