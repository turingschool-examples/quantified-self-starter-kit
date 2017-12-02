var $ = require('jquery')
var foodAjax = require('./AJAX-requests/foods')
var foodListners = require('./event-listners/foods')
require('./styles.scss')

$(document).ready(function() {
  foodAjax.populateFoods()
  foodListners.getValues()
  foodListners.deleteListener()
})
