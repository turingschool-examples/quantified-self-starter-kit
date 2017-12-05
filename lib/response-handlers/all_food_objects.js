const $ = require('jquery')

import { foodsResponse } from '../ajax-requests/food-requests.js'
import { appendFood, appendFoodsToMeals } from "../response-handlers/append-food.js"
import { defaultSort } from '../event-listeners/food-listener'

renderFoods()
renderMealFoods()

function renderFoods() {
  foodsResponse().then(function(foodObjects) {
    for (var i = 0; i < foodObjects.length; i++) {
      appendFood(foodObjects[i], "#foodlist", "food")
    }
    defaultSort($('#foodlist'))
  }).catch(function() {
    $(".alert").append("Error Loading Food Tracker")
  })
}

function renderMealFoods() {
  foodsResponse().then( (foodObjects) => {
    for (let i = 0; i < foodObjects.length; i++) {
      appendFoodsToMeals(foodObjects[i], "#meal-foods-list")
    }
    defaultSort($('#meal-foods-list'))
  }).catch( () => {
    $(".alert").append("Error Loading Food Tracker")
  })
}

export { renderFoods, renderMealFoods }
