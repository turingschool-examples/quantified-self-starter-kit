var $ = require('jquery')
var mealHandler = require('../response-handlers/meals')
var url = 'http://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals'

var populateMeals = function () {
  $.getJSON(url)
  .then(mealHandler.populateMeals)
}

var deleteFood = function () {
  var eventTarget = $(event.target)
  var foodId = eventTarget.closest('tr').data('food-id')
  var mealId = eventTarget.closest('tr').data('meal-id')
  killFoodsMeal(eventTarget, foodId, mealId)
}

function killFoodsMeal (eventTarget, foodId, mealId) {
  $.ajax({
    url: `http://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`,
    type: 'DELETE',
    dataType: 'json'
  })
  .then(function (data) {
    // alert(data.message)
    var removeCals = parseInt(eventTarget.parent()[0].innerText)
    var calTarget = eventTarget.closest('tbody').children('.total-cals').children('.cal-sum')[0]
    var calsRemCell = eventTarget.parent().parent().siblings('.remaining-cals').children('.cal-rem')
    var oldValue = parseInt(calTarget.innerText)
    var newValue = oldValue - removeCals
    var remainingTotal = calsRemCell.data('goal') - newValue
    calTarget.innerText = newValue
    calsRemCell[0].innerText = remainingTotal
    if (remainingTotal < 0) {
      calsRemCell.removeClass('net-positive').addClass('net-negative')
    }
    else {
      calsRemCell.removeClass('net-negative').addClass('net-positive')
    }
    eventTarget.closest('tr').remove()
  })
  .catch(function (error) {
    alert(error.statusText)
  })
}

module.exports = {
  populateMeals,
  deleteFood
}
