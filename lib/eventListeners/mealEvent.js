const $ = require('jQuery')
const MealService = require('../services/mealService')

$(document).ready(() => {
  MealService.addMeals();

})
