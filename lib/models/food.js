const $ = require('jquery')

function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

module.exports = Food;
