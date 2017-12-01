const $ = require('jquery')

export { createFood }
import { appendFood } from "../response-handlers/append-food.js"

const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"

function createFood(foodObject) {
  return $.post(url, {food: foodObject})
}
