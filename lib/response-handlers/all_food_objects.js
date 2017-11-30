const $ = require('jquery')

import { foodsResponse } from '../ajax-requests/all_foods.js'
import { appendFood } from "../response-handlers/append-food.js"

foodsResponse.then(function(foodObjects) {
  for (var i = 0; i < foodObjects.length; i++) {
    appendFood(foodObjects[i])
  }
}).catch(function() {
  console.log("Error Loading Food Tracker")
})
