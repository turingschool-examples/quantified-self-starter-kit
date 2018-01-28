const $ = require('jQuery')
const MealService = require('../services/mealService')
const FoodService = require('../services/foodService')

$(document).ready(() => {
  MealService.addMeals();

  $('#filter-food').on('keyup', (event) => {
    FoodService.displayWith($(event.target).val())
  });

  $('.meal').on('click', (event) => {
    debugger
    if (event.target.hasClass('delete-food')) {
      let mealId = event.currentTarget.dataset.id
      let foodId = event.target.dataset.id
      MealService.deleteFromMeal(mealId, foodId) 
    }
  });

})
