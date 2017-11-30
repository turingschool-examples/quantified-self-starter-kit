const $ = require('jquery')
const $mealsTable = $('.meal-tables');
const Meal = require('../models/Meal')
const HTMLRunner = require('../helpers/HTMLRunner')
const LocalStorage = require('../response_handlers/LocalStorage')

  Meal.allMeals().then((data)=>{
    LocalStorage.saveMealData(data, $mealsTable);
  })

$($mealsTable).on('click', (event)=>{
  if (event.target.className.includes('delete')) {
    Meal.deleteMealFood(
      event.target,
      event.target.parentElement.parentElement
    )
  }
})
