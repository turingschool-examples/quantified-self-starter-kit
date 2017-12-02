
const $ = require('jquery')
const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"

import { appendFood } from '../response-handlers/append-food.js'

function deleteFood(id) {
  $.ajax({
      url: `https://quantified-self-aabs.herokuapp.com/api/v1/foods/${id}`,
      type: 'DELETE',
      success: function(result) {
        alert(`You deleted food id=${id}!`)
      },
      error: function(result) {
        alert(`You must delete the meals this food belongs to in order to delete it.`)
      }
  })
}

function foodsResponse() {
  return $.ajax({
    type: "GET",
    url: url,
  })
}

function createFood(foodObject) {
  $.post(url, {food: foodObject}).done(function( response ) {
    appendFood(response)
  });
}

export { createFood, deleteFood, foodsResponse }
