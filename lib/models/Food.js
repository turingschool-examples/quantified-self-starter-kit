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
  return this.getAllFood()
  .then(function(foods) {
    let allFood = foods.map(function(food) {
      return new Food(food)
    }).map(function(food) {
      return food.toHTML()
    })
    return allFood
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