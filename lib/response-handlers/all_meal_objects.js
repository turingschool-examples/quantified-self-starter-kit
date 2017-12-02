const $ = require('jquery')

import { mealsResponse } from '../ajax-requests/meal-requests.js'
import { appendMeal, appendCalories } from "../response-handlers/append-meal.js"
import { appendFood } from "../response-handlers/append-food.js"

renderMeals()

// render meals
function renderMeals() {
  mealsResponse().then(function(mealObjects) {
    for (var i = 0; i < mealObjects.length; i++) {
      let meal = mealObjects[i]
      appendMeal(meal)
      for (var j = 0; j < meal.foods.length; j++) {
        appendFood(meal.foods[j], `.list#${meal.name}`)
      }
      appendCalories(meal.name)
      renderCalories(meal.name)
    }
  }).catch(function() {
    $(".alert").append("Error Loading Food Tracker")
  })
}

// render total calories
 const renderCalories = (name) => {
   let tableCalories = getCalories(name)
   let totalCalories = sumCalories(tableCalories)
   $(`#${name}-calories`).text(totalCalories)
 }

 const getCalories = (name) => {
   let calories = []
   $(`#${name} td.calories`).each( (index, val) => {
     calories.push(parseInt(val.innerHTML))
   })
   return calories
 }

 const sumCalories = (tableCalories) => {
   return tableCalories.reduce( (calories, total) => {
     return calories + total
   }, 0)
 }

 // render remaining cals
