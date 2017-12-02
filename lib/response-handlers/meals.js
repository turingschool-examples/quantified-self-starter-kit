var $ = require('jquery')

var populateMeals = function (data) {
  data.forEach(function (meal) {
    meal.foods.forEach(function (food) {
      $(`.${meal.name.toLowerCase()}`).prepend(`<tr data-meal-id="${meal.id}" data-food-id="${food.id}"><td>${food.name}</td><td><i class="delete-button fa fa-minus-circle" aria-hidden="true"></i>${food.calories}</td></tr>`)
    })
  })
}

var errorLog = function (data) {
  console.error(data)
}

module.exports = {
  errorLog,
  populateMeals
}
