const $ = require('jquery')
const Meal = require("../models/meal")

$( document ).ready(function() {
  Meal.allMealsToHTML()
  .then(function(mealHTML) {
    debugger
  })
})