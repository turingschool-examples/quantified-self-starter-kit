const $ = require('jquery')

import { foodsResponse } from '../ajax-requests/food-requests.js'
import { appendFood } from "../response-handlers/append-food.js"

renderFoods()

function renderFoods() {
  foodsResponse().then(function(foodObjects) {
    for (var i = 0; i < foodObjects.length; i++) {
      appendFood(foodObjects[i])
    }
  }).catch(function() {
    $(".alert").append("Error Loading Food Tracker")
  })
}

export { renderFoods }
