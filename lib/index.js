
const $ = require('jquery')
const Food = require("./models/food")
const Meal = require("./models/meal")

$( document ).ready(function() {
  require('./events/food-events')
  require('./events/meal-events')
})
