const $ = require('jquery')
const Meal = require("../models/meal")

$( document ).ready(function() {
  Meal.allMealsToHTML()
})

$('.add-to-meal .btn').on('click', Meal.addFoodstoMealTable);