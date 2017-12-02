import { Food } from '../models/food.js'
import { renderFoods } from '../response-handlers/all_food_objects.js'
import { createFood, deleteFood, updateFood, foodsResponse } from '../ajax-requests/food-requests.js'

const $ = require('jquery')

$("#food_form").on("submit", (event) => {
  event.preventDefault()
  let newFood = foodFormData()
  clearFormFields()
  if (objectHasData(newFood)) {
    createFood(newFood)
  }
})

const objectHasData = (newFood) => {
  let foodname = newFood.name
  let calories =  newFood.calories
  if (foodname === '' || calories === '') {
    return false
  } else {
    return true
  }
}

const foodFormData = () => {
  let name = $("#name").val()
  let calories =  $("#calories").val()
  let newFood = new Food(name, calories)
  return newFood
}

const clearFormFields = () => {
    $("#name").val("")
    $("#calories").val("")
  }


//delete button functions
$(document).on({
  mouseenter: function () {
    $(this).prop("src", "src/x-button.svg")
  },
  mouseleave: function () {
    $(this).prop("src", "src/delete.svg")
  },
  click: function () {
    let parent = $(this).parents("tr")
    deleteFood(parent.attr('id'))
    parent.remove()
  }
}, '.delete_button')



//edit food functions
$(document).on({
  click: function () {
    $(this).attr('contenteditable', "true")
  },
  blur: function () {
    $(this).attr('contenteditable', "false")
    let row = $(this).parent()
    let id = row.attr('id')
    let name = row.find('.name').text()
    let calories = row.find('.calories').text()
    let newFood = new Food(name, calories, id)
    updateFood(newFood)
  }
}, '.foodinfo')

//filter functions
$("#foodfilter").on('keyup', () => {
    let term = $("#foodfilter").val()
    let regex = new RegExp(term, "i")
    $("tr").hide()
    $("th").parents().show()
    let result = $("tr").filter(function () {
      return regex.test($(this).children().text());
    }).show()

  })
