var $ = require('jquery')
var foodAjax = require('./AJAX-requests/foods')
var mealAjax = require('./AJAX-requests/meals')
var foodListners = require('./event-listners/foods')
var mealListners = require('./event-listners/meals')
require('./styles.scss')

$(document).ready(function () {
  if (window.location.pathname === '/') {
    mealAjax.populateMeals()
    mealListners.deleteListener()
    mealAjax.populateFoods()
  }
  else {
    foodAjax.populateFoods()
    foodListners.getValues()
    foodListners.deleteListener()
  }
})
