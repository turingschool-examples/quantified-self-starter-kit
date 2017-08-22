const $ = require('jquery')
const Food = require('./food')

function Meal(meal){
	this.id = meal.id;
	this.name = meal.name;
	this.foods = meal.foods.map(function(food) {
		return new Food(food)
	});
	this.totalCalories = meal.foods.reduce(function(sum, food) {
		return sum + food.calories
	}, 0);
}

Meal.allMealsToHTML = function() {
  return this.getAllMeals()
  .then(function(mealList) {
    return mealList.map(function(meal) {
      return new Meal(meal);
    })
  })
  .then(function(mealList) {
    return Meal.populateMealLists(mealList)
    })
}

Meal.populateMealLists = function(mealList) {
	mealList.forEach(function(meal) {
		switch(meal.name) {
			case "Breakfast":
			debugger
				//code
				break;
			case "Lunch":
			debugger
				//code
				break;
			case "Dinner":
			debugger
				//code
				break;
			case "Snack":
			debugger
				//code
				break;
		}
	})
}


Meal.getAllMeals = function() {
  return $.ajax({
    type: "GET",
    url: 'http://localhost:3000/api/v1/meals',
    dataType:"json",
  })
  .done(function(data) {
    return data;
  })
  .fail(function(error) {
    debugger
  })
}


module.exports = Meal