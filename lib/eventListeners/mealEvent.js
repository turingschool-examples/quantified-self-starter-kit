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

  $('#foods-table').on('click', (event) => {
     event.stopPropagation();
     console.log(event.currentTarget);
    if (event.target.type === "checkbox") {
      MealService.arrayOfFood(event);
    }
  });

  $('.add-to-meal-button').on('click', (event) => {
     event.stopPropagation();
     let mealId = event.target.dataset.id;
     MealService.sendFood(mealId)

  })

})
