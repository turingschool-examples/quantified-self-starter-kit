const $ = require('jQuery')
require('./eventListeners/foodEvent')
import { getAllFoods, deleteFood, postFood, editBox, editFood } from './services/foodService'
const MealService = require('./services/mealService')

$(document).ready(() => {

}

$(document).ready(() => {
  MealService.addMeals();
});
