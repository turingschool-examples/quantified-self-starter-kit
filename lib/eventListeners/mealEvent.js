const $ = require('jQuery')
const MealService = require('../services/mealService')
const FoodService = require('../services/foodService')

$(document).ready(() => {
  MealService.addMeals();

  $('#filter-food').on('keyup', (event) => {
    FoodService.displayWith($(event.target).val())
  });

})
