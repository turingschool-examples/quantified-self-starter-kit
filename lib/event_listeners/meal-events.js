const $ = require('jquery')
const $mealsTable = $('.meal-tables');
const $foodsTable = $('.food-meal-body');
const $foodForm = $('#food_form');
const $consumedCals = $('.calories-consumed-val');
const $mealSelectionButton = $('.add-to-meal-button');
const $totalRemainingCals = $('.total-remaining-calories-val');

const Meal = require('../models/Meal')
const Food = require('../models/Food')
const HTMLRunner = require('../helpers/HTMLRunner')
const Calories = require('../helpers/Calories')
const LocalStorage = require('../response_handlers/LocalStorage')

$foodForm.hide();
Meal.allMeals().then((data)=>{
  LocalStorage.saveMealData(data, $mealsTable);
  $consumedCals.trigger('click')
})

Food.allFood().then((data)=>{
  LocalStorage.saveFoodData(data, $foodsTable);

})

$($mealsTable).on('click', (event)=>{
  if (event.target.className.includes('delete')) {
    Meal.deleteMealFood(
      event.target,
      event.target.parentElement.parentElement.parentElement
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

$($mealSelectionButton).on('click', (event)=>{
  const foodIDs = []
  const mealID = event.target.id
  const meal = event.target.innerText
  $('.food-meal-body input:checkbox:checked').map( function(){
    foodIDs.push($(this).attr("id").split(" ")[1])
    $(this).prop('checked', false)
  });
  Meal.addFoodToMeal(mealID, foodIDs).then((data)=>{
    HTMLRunner.eventCalTrigger(meal)
    $consumedCals.trigger('click')
  })
})
