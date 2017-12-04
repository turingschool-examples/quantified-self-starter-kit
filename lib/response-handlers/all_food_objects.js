const $ = require('jquery')

import { foodsResponse } from '../ajax-requests/food-requests.js'
import { appendFood, appendFoodsToMeals } from "../response-handlers/append-food.js"

renderFoods()
renderMealFoods()

function renderFoods() {
  foodsResponse().then(function(foodObjects) {
    for (var i = 0; i < foodObjects.length; i++) {
      appendFood(foodObjects[i], "#foodlist", "food")
    }
  }).catch(function() {
    $(".alert").append("Error Loading Food Tracker")
  })
}

function renderMealFoods() {
  foodsResponse().then( (foodObjects) => {
    for (let i = 0; i < foodObjects.length; i++) {
      // append to meals
      appendFoodsToMeals(foodObjects[i], "#meal-foods-list")
    }
  }).catch( () => {
    $(".alert").append("Error Loading Food Tracker")
  })
}

export { renderFoods, renderMealFoods }
