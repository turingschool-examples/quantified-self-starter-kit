const $ = require('jquery')

import { mealsResponse } from '../ajax-requests/meal-requests.js'
import { appendMeal } from "../response-handlers/append-meal.js"
import { appendFood } from "../response-handlers/append-food.js"

renderMeals()

function renderMeals() {
  mealsResponse().then(function(mealObjects) {
    for (var i = 0; i < mealObjects.length; i++) {
      let meal = mealObjects[i]
      appendMeal(meal)
      for (var j = 0; j < meal.foods.length; j++) {
        appendFood(meal.foods[j], `.list#meal-${meal.id}`)
      }
    }
  }).catch(function() {
    $(".alert").append("Error Loading Food Tracker")
  })
}
