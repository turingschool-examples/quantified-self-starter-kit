const $ = require('jquery')
const $mealsTable = $('.meal-tables');
const Meal = require('../models/Meal')
const HTMLRunner = require('../helpers/HTMLRunner')
const LocalStorage = require('../response_handlers/LocalStorage')

Meal.all_meals().then((data)=>{
  LocalStorage.saveMealData(data);
  HTMLRunner.appendTable($mealsTable, data);
})
