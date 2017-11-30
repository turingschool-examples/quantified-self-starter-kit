const $ = require('jquery')

const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"

function createFood(foodItem) { $.post(url, food_item)({
    .then(appendFood)
    .catch("wrong")
  }})

import { foodObject } from '../event-listeners/food-listener.js'



// POST /api/v1/foods - allows creating a new food with the parameters:
// { food: { name: "Name of food here", calories: "Calories here"} }
// If food is successfully created, the food item will be returned. If the food is not successfully created,
// a 400 status code will be returned. Both name and calories are required fields.
