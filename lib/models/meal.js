const $ = require('jquery')
const Food = require('./food')

const calorieGoals = {
      "Breakfast": 400,
      "Snack": 200,
      "Lunch": 600,
      "Dinner": 800
    }

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
    Meal.populateMealLists(mealList)
    return Meal.calculateCalories(mealList)
    })
}

Meal.populateMealLists = function(mealList) {
	mealList.forEach(function(meal) {
		switch(meal.name) {
			case "Breakfast":
				$('#total-breakfast-calories').append(meal.totalCalories)
				$('#remaining-breakfast-calories').append(400 - meal.totalCalories)
				meal.foods.forEach(function(food) {
					$('.diary-table-breakfast').append(food.toHTML())
				})
				break;
			case "Lunch":
				$('#total-lunch-calories').append(meal.totalCalories)
				$('#remaining-lunch-calories').append(600 - meal.totalCalories)
				meal.foods.forEach(function(food) {
					$('.diary-table-lunch').append(food.toHTML())
				})
				break;
			case "Dinner":
				$('#total-dinner-calories').append(meal.totalCalories)
				$('#remaining-dinner-calories').append(800 - meal.totalCalories)
				meal.foods.forEach(function(food) {
					$('.diary-table-dinner').append(food.toHTML())
				})
				break;
			case "Snack":
				$('#total-snacks-calories').append(meal.totalCalories)
				$('#remaining-snacks-calories').append(200 - meal.totalCalories)
				meal.foods.forEach(function(food) {
					$('.diary-table-snacks').append(food.toHTML())
				})
				break;
		}
	})
}

Meal.getAllMeals = function() {
  return $.ajax({
    type: "GET",
    url: 'https://shrouded-headland-61661.herokuapp.com/api/v1/meals',
    dataType:"json",
  })
  .done(function(data) {
    return data;
  })
  .fail(function(error) {
    debugger
  })
}

Meal.calculateCalories = function(mealList) {
	
}

module.exports = Meal