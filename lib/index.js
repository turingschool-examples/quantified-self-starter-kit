var $ = require('jquery')
var foodAjax = require('./AJAX-requests/foods')
var mealAjax = require('./AJAX-requests/meals')
var foodListners = require('./event-listners/foods')
var mealListners = require('./event-listners/meals')
require('./styles.scss')

$(document).ready(function () {
  if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === 'quantified-self-starter-kit/' || window.location.pathname === 'quantified-self-starter-kit/index.html') {
    mealAjax.populateMeals()
    mealListners.deleteListener()
    mealAjax.populateFoods()
    mealListners.searchListeners()
    mealListners.filterCalories()
}
  else {
    foodAjax.populateFoods()
    foodListners.getValues()
    foodListners.deleteListener()
    foodListners.searchListeners()
    foodListners.foodEditListeners()
  }

})
