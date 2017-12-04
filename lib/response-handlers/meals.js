var $ = require('jquery')

var populateMeals = function (data) {
  data.forEach(function (meal) {
    var totalCals = 0
    var remainingCalsCell = $(`.${meal.name.toLowerCase()}`).children('tbody').children('.remaining-cals').children('.cal-rem')
    meal.foods.forEach(function (food) {
      totalCals += Number(food.calories)
      $(`.${meal.name.toLowerCase()}`).prepend(`<tr data-meal-id="${meal.id}" data-food-id="${food.id}"><td>${food.name}</td><td class="cals"><i class="delete-button fa fa-minus-circle" aria-hidden="true"></i>${food.calories}</td></tr>`)
    })
    var remainingCals = remainingCalsCell.data('goal') - totalCals
    remainingCalsCell.append(remainingCals)
    if (remainingCals < 0) {
      remainingCalsCell.toggleClass('net-positive net-negative')
    }
    $(`.${meal.name.toLowerCase()}`).children('tbody').children('.total-cals').children('.cal-sum').prepend(`${totalCals}`)
  })
}

var errorLog = function (data) {
  console.error(data)
}

module.exports = {
  errorLog,
  populateMeals
}
