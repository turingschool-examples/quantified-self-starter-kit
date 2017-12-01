var $ = require('jquery')
var foodAjax = require('./AJAX-requests/foods')
var foodListners = require('./event-listners/foods')


$(document).ready(function() {
  foodAjax.populateFoods()
  foodListners.getValues()
  foodListners.deleteListener()
})
