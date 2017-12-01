import { Food } from '../models/food.js'
import { createFood } from '../ajax-requests/add_food.js'
import { renderFoods } from '../response-handlers/all_food_objects.js'
import { appendFood } from '../response-handlers/append-food.js'
import { deleteFood } from '../ajax-requests/delete-food.js'

const $ = require('jquery')

let foodObj = $("#food_form").on("submit", function(event) {
  event.preventDefault()
  let name = $("#name").val()
  let calories =  $("#calories").val()
  let newFood = new Food(name, calories)
  $("#name").val("")
  $("#calories").val("")
  createFood(newFood).done(function( data ) {
    appendFood(data)
  })
})

$(document).on({
  mouseenter: function () {
    $(this).prop("src", "src/x-button.svg")
  },
  mouseleave: function () {
    $(this).prop("src", "src/delete.svg")
  },
  click: function() {
    let parent = $(this).parents("tr")
    deleteFood(parent.attr('id'))
    parent.remove()
  }
}, '.delete_button')
