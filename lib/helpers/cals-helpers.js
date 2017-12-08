var $ = require('jquery')

function updateCalories (caloriesChange, mealTable) {
  var oldCalsConsumed = $('.total-cals-consumed')
  var oldCalsRemaining = $('.total-cals-remaining')
  var oldMealCalsConsumed = mealTable.children('.total-cals').children('.cal-sum')
  var oldMealCalsRemaining = mealTable.children('.remaining-cals').children('.cal-rem')
  var newCalsRemaining = parseInt(oldCalsRemaining[0].innerText) - caloriesChange
  var newMealCalsRemaining = parseInt(oldMealCalsRemaining[0].innerText) - caloriesChange
  oldCalsConsumed[0].innerText = parseInt(oldCalsConsumed[0].innerText) + caloriesChange
  oldCalsRemaining[0].innerText = newCalsRemaining
  toggleCalsClass(newCalsRemaining, oldCalsRemaining)
  oldMealCalsConsumed[0].innerText = parseInt(oldMealCalsConsumed[0].innerText) + caloriesChange
  oldMealCalsRemaining[0].innerText = newMealCalsRemaining
  toggleCalsClass(newMealCalsRemaining, oldMealCalsRemaining)
}

var toggleCalsClass = function (comparison, target) {
  if (comparison < 0) {
    target.removeClass('net-positive').addClass('net-negative')
  }
  else {
    target.removeClass('net-negative').addClass('net-positive')
  }
}

module.exports = {
  updateCalories,
  toggleCalsClass
}
