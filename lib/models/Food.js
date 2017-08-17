const $ = require('jQuery')

class Food {
  constructor(attrs) {
    this.name = attrs.name
    this.calories = attrs.calories
  }

  toHTML() {
    return `<tr><td>${this.name}</td><td>${this.calories}</td></tr>`
  }
}

Food.allFoodToHTML = function() {
  this.getAllFood()
  .then((foods) => {
    return foods.map((food) => {
      return new Food(food)
    })
  })
  .then((foods) => {
    return foods.map((food) => {
      return food.toHTML()
    })
  })
}

Food.getAllFood = () => {
  return $.ajax({
    type: "GET",
    url: "https://qs-baochris-api.herokuapp.com/api/v1/foods"
  })
  .done(function(data){
    //not appending data here
  })
  .fail(function(error){
    console.log(error)
  });
}

module.exports = Food