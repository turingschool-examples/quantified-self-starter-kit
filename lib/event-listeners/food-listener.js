import { Food } from '../models/food.js'
import { createFood } from '../ajax-requests/add_food.js'

const $ = require('jquery')

let foodObj = $("#food_form").on("submit", function(event) {
  event.preventDefault()
  let name = $("#name").val()
  let calories =  $("#calories").val()
  let newFood = new Food(name, calories)
  $("#name").val("")
  $("#calories").val("")
  createFood(newFood)
})

$(document).on({
    mouseenter: function () {
        $(this).prop("src", "src/x-button.svg")
    },
    mouseleave: function () {
        $(this).prop("src", "src/delete.svg")
    }
}, '.delete_button')