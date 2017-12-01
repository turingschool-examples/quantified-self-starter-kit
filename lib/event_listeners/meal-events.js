const $ = require('jquery')
const $mealsTable = $('.meal-tables');
const $foodForm = $('#food_form');
const $consumedCals = $('.calories-consumed-val');
const $totalRemainingCals = $('.total-remaining-calories-val');
const Meal = require('../models/Meal')
const HTMLRunner = require('../helpers/HTMLRunner')
const Calories = require('../helpers/Calories')
const LocalStorage = require('../response_handlers/LocalStorage')

$foodForm.hide();
Meal.allMeals().then((data)=>{
  LocalStorage.saveMealData(data, $mealsTable);
  $consumedCals.trigger('click')
})


$($mealsTable).on('click', (event)=>{
  if (event.target.className.includes('delete')) {
    Meal.deleteMealFood(
      event.target,
      event.target.parentElement.parentElement
    ).then((meal)=>{
      $consumedCals.trigger('click')
      HTMLRunner.eventCalTrigger(meal)
    })
  }
})
$($consumedCals).on('click', (event)=>{
  Calories.updateCalories($consumedCals).then((data)=>{
    $totalRemainingCals.trigger('click')
  })
})

$($totalRemainingCals).on('click', (event)=>{
  Calories.updateRemainingCalories(
    $totalRemainingCals,
    $consumedCals.html()
  )
})

$($mealsTable).on('click', '.meal-calories', (event)=>{
  const meal = (event.target.className).split('-')[0]
  const mealID = event.target.id
  Calories.updateMealCalories($(`.${meal}-calories`), mealID, meal)
  .then((data)=>{
    HTMLRunner.eventRemainingTrigger(meal)
  })
})

$($mealsTable).on('click', '.meal-calories-remaining', (event)=>{
  const meal = (event.target.className).split('-')[0]
  const mealID = event.target.id
  Calories.updateRemainingMealCalories($(`.${meal}-remaining-calories`), mealID)
})
