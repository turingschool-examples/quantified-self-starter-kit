require("../models/food.js")

const $ = require('jquery')

import { foodsResponse } from '../ajax-requests/all_foods.js'

function createFood() {
  // let foodParams = $('#food-form').on('submit')
  $("#add-food").on("click", function(event) {
  event.preventDefault()
  let name = $("#name").val()
  let calories =  $("#calories").val()
  console.log(name, calories)
  // return new Food(foodParams.name, foodParams.calories)
})
}

createFood()

// export { foodObject }
