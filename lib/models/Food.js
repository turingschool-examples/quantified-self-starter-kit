const $          = require('jquery')
const deleteIcon = '../../'

class Food {
  constructor(attrs) {
    this.id       = attrs.id
    this.name     = attrs.name
    this.calories = attrs.calories
  }

  toHTML() {
    return `<tr class="food-row">` +
      `<td class="food-name" data-id="${this.id}">${this.name}</td>` +
      `<td>${this.calories}</td>` +
      `<td><input type="image" src="../../vendor/assets/delete.png" class="delete-food" id="delete-food-${this.id}"/></td></tr>`
  }
}

Food.allFoodToHTML = function(foods) {
  return foods.map((food) => {
    return food.toHTML()
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

Food.addFood = function() {
  return this.post()
  .then(function(food) {
    let foodObj = new Food(food)
    return foodObj.toHTML()
  })
}

Food.post = () => {
  const foodName = $('input[name="food-name"]').val()
  const foodCal = $('input[name="food-calories"]').val()
  const data = { name: foodName, calories: foodCal}
  
  return $.post("https://qs-baochris-api.herokuapp.com/api/v1/foods", {
    food: data
  }, (data, status) => {
    console.log("food added" + "\nStatus: " + status)
  })
}

module.exports = Food