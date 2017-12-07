var $ = require('jquery')

var populateMeals = function (data) {
  var totalCals = 0
  data.forEach(function (meal) {
    var mealTotalCals = 0
    var remainingCalsCell = $(`tbody.${meal.name.toLowerCase()}`).children('.remaining-cals').children('.cal-rem')
    $(`tbody.${meal.name.toLowerCase()}`).attr('data-id', meal.id)
    meal.foods.forEach(function (food) {
      mealTotalCals += Number(food.calories)
      $(`tbody.${meal.name.toLowerCase()}`).prepend(`<tr data-meal-id="${meal.id}" data-food-id="${food.id}"> <td>${food.name}</td> <td class="cals"> ${food.calories} </td> <td class="delete-cell"> <i class="delete-button fa fa-minus-circle" aria-hidden="true"> </i> </td> </tr>`)
    })
    var remainingCals = remainingCalsCell.data('goal') - mealTotalCals
    remainingCalsCell.append(remainingCals)
    if (remainingCals < 0) {
      remainingCalsCell.toggleClass('net-positive net-negative')
    }
    $(`.${meal.name.toLowerCase()}`).children('tbody').children('.total-cals').children('.cal-sum').prepend(`${mealTotalCals}`)
    totalCals += mealTotalCals
  })
  var remainingCals = 2000 - totalCals
  var calsRemCell = $('.total-cals-remaining')
  $('.total-cals-consumed').append(totalCals)
  calsRemCell.append(remainingCals)
  toggleCalsClass(remainingCals, calsRemCell)
}

var errorLog = function (data) {
  console.error(data)
}

var deleteHandler = function (eventTarget) {
  var removeCals = parseInt(eventTarget.parent().siblings('.cals')[0].innerText)
  var calTarget = eventTarget.closest('tbody').children('.total-cals').children('.cal-sum')[0]
  var calsRemCell = eventTarget.parent().parent().siblings('.remaining-cals').children('.cal-rem')
  var newValue = parseInt(calTarget.innerText) - removeCals
  var remainingTotal = calsRemCell.data('goal') - newValue
  var totalCalsRem = $('.total-cals-remaining')
  var totalCalsConsumed = $('.total-cals-consumed')
  calTarget.innerText = newValue
  calsRemCell[0].innerText = remainingTotal
  toggleCalsClass(remainingTotal, calsRemCell)
  totalCalsRem[0].innerText = parseInt(totalCalsRem[0].innerText) + removeCals

  totalCalsConsumed[0].innerText = parseInt(totalCalsConsumed[0].innerText) - removeCals
  toggleCalsClass(totalCalsRem[0].innerText, totalCalsRem)
  eventTarget.closest('tr').remove()
}

var toggleCalsClass = function (comparison, target) {
  if (comparison < 0) {
    target.removeClass('net-positive').addClass('net-negative')
  }
  else {
    target.removeClass('net-negative').addClass('net-positive')
  }
}

var populateFoods = function (data) {
  data.forEach(function (food) {
    $('.food-table-meals').prepend(`<tr data-id="${food.id}" data-cals="${food.calories}" data-name="${food.name}"><td>${food.name}</td><td>${food.calories}</td><td class="checkbox-cell"><input class="food-checkbox" type="checkbox"></td></tr>`)
  })
}

module.exports = {
  errorLog,
  populateMeals,
  deleteHandler,
  populateFoods
}
