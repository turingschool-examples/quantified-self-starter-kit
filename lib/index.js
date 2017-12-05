var $ = require('jquery')
var foodAjax = require('./AJAX-requests/foods')
var mealAjax = require('./AJAX-requests/meals')
var foodListners = require('./event-listners/foods')
var mealListners = require('./event-listners/meals')
require('./styles.scss')

$(document).ready(function () {
  if (window.location.pathname === '/' || '/index.html' || 'quantified-self-starter-kit/' || 'quantified-self-starter-kit/index.html') {
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
