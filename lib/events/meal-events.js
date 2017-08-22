const $ = require('jquery')
const Meal = require("../models/meal")

$( document ).ready(function() {
  Meal.allMealsToHTML()
  //Meal.calculateCalories()
})