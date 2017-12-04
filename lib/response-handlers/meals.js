var $ = require('jquery')

var populateMeals = function (data) {
  var totalCals = 0
  data.forEach(function (meal) {
    var mealTotalCals = 0
    var remainingCalsCell = $(`.${meal.name.toLowerCase()}`).children('tbody').children('.remaining-cals').children('.cal-rem')
    meal.foods.forEach(function (food) {
      mealTotalCals += Number(food.calories)
      $(`.${meal.name.toLowerCase()}`).prepend(`<tr data-meal-id="${meal.id}" data-food-id="${food.id}"><td>${food.name}</td><td class="cals"><i class="delete-button fa fa-minus-circle" aria-hidden="true"></i>${food.calories}</td></tr>`)
    })
    var remainingCals = remainingCalsCell.data('goal') - mealTotalCals
    remainingCalsCell.append(remainingCals)
    if (remainingCals < 0) {
      remainingCalsCell.toggleClass('net-positive net-negative')
    }
    $(`.${meal.name.toLowerCase()}`).children('tbody').children('.total-cals').children('.cal-sum').prepend(`${mealTotalCals}`)
    totalCals += mealTotalCals
  })
  $('.total-cals-consumed').append(totalCals)
  $('.total-cals-remaining').append(2000 - totalCals)
  if ((2000 - totalCals) < 0) {
    $('.total-cals-remaining').removeClass('net-positive').addClass('net-negative')
  }
}

var errorLog = function (data) {
  console.error(data)
}

var deleteHandler = function (eventTarget) {
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
  var totalCalsRem = $('.total-cals-remaining')
  var totalCalsConsumed = $('.total-cals-consumed')
  totalCalsRem[0].innerText = parseInt(totalCalsRem[0].innerText) + removeCals
  totalCalsConsumed[0].innerText = parseInt(totalCalsConsumed[0].innerText) - removeCals
  if (totalCalsRem[0].innerText < 0) {
    totalCalsRem.removeClass('net-positive').addClass('net-negative')
  }
  else {
    totalCalsRem.removeClass('net-negative').addClass('net-positive')
  }
  eventTarget.closest('tr').remove()
}

var populateFoods = function (data) {
  data.forEach(function(food){
    $('.food-table-meals').prepend(`<tr data-id="${food.id}"><td>${food.name}</span></td><td>${food.calories}</td></tr>`)
  })
}

module.exports = {
  errorLog,
  populateMeals,
  deleteHandler,
  populateFoods
}
