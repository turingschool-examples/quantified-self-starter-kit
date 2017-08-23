const $ = require('jquery')
const Food = require('./food')

var $calorieGoals = {
      "Breakfast": 400,
      "Snack": 200,
      "Lunch": 600,
      "Dinner": 800
    };

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
				Meal.mealCaloriesRemaining($('#remaining-breakfast-calories'), meal, 400)
				var mealName = 'breakfast'
				Meal.generateMealTable(meal, mealName, 400)
				break;
			case "Lunch":
				Meal.mealCaloriesRemaining($('#remaining-lunch-calories'), meal, 600)
				var mealName = 'lunch'
				Meal.generateMealTable(meal, mealName, 600)
				break;
			case "Dinner":
				Meal.mealCaloriesRemaining($('#remaining-dinner-calories'), meal, 800)
				var mealName = 'dinner'
				Meal.generateMealTable(meal, mealName, 800)
				break;
			case "Snack":
				Meal.mealCaloriesRemaining($('#remaining-snacks-calories'), meal, 200)
				var mealName = 'snacks'
				Meal.generateMealTable(meal, mealName, 200)
				break;
		}
	})
}

Meal.generateMealTable = function(meal, mealName, calorieGoal) {
	$(`#total-${mealName}-calories`).append(meal.totalCalories)
	var mealRef = mealName
	meal.foods.forEach(function(food, mealRef) {
		$(`.diary-table-${mealName}`).append(food.toHTML())
	})
}

Meal.mealCaloriesRemaining = function(target, meal, goal) {
	var caloriesRemaining = goal - meal.totalCalories
	target.append(caloriesRemaining)
	if (caloriesRemaining > 0) {
		target.css("color", "green")
	} else {
		target.css("color", "red")
	}
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