import { Food } from '../models/food.js'
import { createFood } from '../ajax-requests/add_food.js'

const $ = require('jquery')

let foodObj = $("#add-food").on("click", function(event) {
  event.preventDefault()
  let name = $("#name").val()
  let calories =  $("#calories").val()
  let newFood = new Food(name, calories)
  createFood(newFood)
})
