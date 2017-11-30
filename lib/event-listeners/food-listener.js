// require("../models/food.js")

const $ = require('jquery')

import { foodsResponse } from '../ajax-requests/all_foods.js'

import { Food } from '../models/food.js'

function createFood() {
  // let foodParams = $('#food-form').on('submit')
  $("#add-food").on("click", function(event) {
  event.preventDefault()
  let name = $("#name").val()
  let calories =  $("#calories").val()
  // return new Food(name, calories)
  const newFood = new Food(name, calories)
  console.log(newFood)
  })
}

createFood()

// export { foodObject }
