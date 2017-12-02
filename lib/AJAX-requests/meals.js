var $ = require('jquery')
var mealHandler = require('../response-handlers/meals')
var url = 'http://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals'

var populateMeals = function () {
  $.getJSON(url)
  .then(mealHandler.populateMeals)
}

var deleteFood = function () {
  var target = $(event.target)
  var foodId = target.closest('tr').data('food-id')
  var mealId = target.closest('tr').data('meal-id')
  var foodName = target.parent().siblings()[0].innerHTML
  var mealName = target.closest('table').attr('class')
  $.ajax({
    url: `http://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`,
    type: 'DELETE',
    dataType: 'json'
  })
  .then(function (data) {
    alert(`${foodName} has been removed from ${mealName}`)
    target.closest('tr').remove()
  })
  .fail(function (error) {
    alert('food not deleted')
  })
}

module.exports = {
  populateMeals,
  deleteFood
}
