
const $ = require('jquery')
const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"

import { appendFood } from '../response-handlers/append-food.js'

function deleteFood(id) {
  $.ajax({
      url: `${url}/${id}`,
      type: 'DELETE',
      success: (result) => {
        alert(`You deleted food id=${id}!`)
      },
      error: (result) => {
        alert(`You must delete the meals this food belongs to in order to delete it.`)
      }
  })
}

function updateFood(foodObject) {
  $.ajax({
      url: `${url}/${foodObject.id}`,
      data: {food: foodObject},
      type: 'PATCH'
  })
}

function foodsResponse() {
  return $.get(url)
}

function createFood(foodObject) {
  $.post(url, {food: foodObject}).done( ( response ) => {
    appendFood(response)
  });
}

export { createFood, deleteFood, updateFood, foodsResponse }
