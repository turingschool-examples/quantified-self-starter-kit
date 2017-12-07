var $ = require('jquery')
var ajaxReq = require('../AJAX-requests/meals')

var deleteListener = function () {
  $('tbody').on('click', 'i.delete-button', function () {
      ajaxReq.deleteFood()
  })
}

var addFoodToMeal = function () {
  $('.add-to-meal').on('click', function () {
    ajaxReq.addFoodToMeal()
  })
}
module.exports = {
  deleteListener,
  addFoodToMeal
}
