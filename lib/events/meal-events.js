const $ = require('jquery')
const Meal = require("../models/meal")

$( document ).ready(function() {
  Meal.allMealsToHTML()
})

$('.add-to-meal .btn').on('click', Meal.addFoodstoMealTable);

$('.meal-table').on('click', '.trash-can', function(event) {
  event.preventDefault();

  var foodID = this.parentElement.parentElement.parentElement.childNodes[0].dataset.id
  var mealID = this.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id
  Meal.deleteFood(foodID, mealID)
  this.parentElement.parentElement.parentElement.remove()
})