const $ = require('jquery')

import { mealsResponse } from '../ajax-requests/meal-requests.js'
import { appendMeal } from "../response-handlers/append-food.js"
import { appendFood } from "../response-handlers/append-food.js"

renderFoods()

function renderMeals() {
  mealsResponse().then(function(mealObjects) {
    for (var i = 0; i < mealObjects.length; i++) {
      let meal = appendMeal(mealObjects[i])
      for (var j = 0; j < meal.foods.length; j++) {
        appendFood(meal.foods[j])
      }
    }
  }).catch(function() {
    $(".alert").append("Error Loading Food Tracker")
  })
}

export { renderMeals }
