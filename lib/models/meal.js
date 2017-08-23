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
				$('#total-breakfast-calories').append(meal.totalCalories)
				//$('#remaining-breakfast-calories').append(400 - meal.totalCalories).addClass('negative')
				Meal.mealCaloriesRemaining($('#remaining-breakfast-calories'), meal, 400)
				meal.foods.forEach(function(food) {
					$('.diary-table-breakfast').append(food.toHTML())
				})
				// var mealName = 'breakfast'
				// Meal.generateMealTable(meal, mealName, 400)
				break;
			case "Lunch":
				$('#total-lunch-calories').append(meal.totalCalories)
				//$('#remaining-lunch-calories').append(600 - meal.totalCalories)
				Meal.mealCaloriesRemaining($('#remaining-lunch-calories'), meal, 600)
				meal.foods.forEach(function(food) {
					$('.diary-table-lunch').append(food.toHTML())
				})
				// var mealName = 'lunch'
				// Meal.generateMealTable(meal, mealname, 600)
				break;
			case "Dinner":
				$('#total-dinner-calories').append(meal.totalCalories)
				//$('#remaining-dinner-calories').append(800 - meal.totalCalories)
				Meal.mealCaloriesRemaining($('#remaining-dinner-calories'), meal, 800)
				meal.foods.forEach(function(food) {
					$('.diary-table-dinner').append(food.toHTML())
				})
				// var mealName = 'dinner'
				// Meal.generateMealTable(meal, mealname, 800)
				break;
			case "Snack":
				$('#total-snacks-calories').append(meal.totalCalories)
				//$('#remaining-snacks-calories').append(200 - meal.totalCalories)
				Meal.mealCaloriesRemaining($('#remaining-snacks-calories'), meal, 200)
				meal.foods.forEach(function(food) {
					$('.diary-table-snacks').append(food.toHTML())
				})
				// var mealName = 'snacks'
				// Meal.generateMealTable(meal, mealname, 200)
				break;
		}
	})
}

// Meal.generateMealTable = function(meal, mealName, calorieGoal) {

// 				$(`#total-${mealName}-calories`).append(meal.totalCalories)
// 				$(`#remaining-${mealName}-calories`).append(calorieGoal - meal.totalCalories)
// 				meal.foods.forEach(function(food, mealName) {
// 					$(`.diary-table-${mealName}`).append(food.toHTML())
// 				})
// 			}

Meal.mealCaloriesRemaining = function(target, meal, goal) {
	var caloriesRemaining = goal - meal.totalCalories
	target.append(caloriesRemaining)
	//ebugger
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

Meal.calculateCalories = function(mealList) {
	
}

module.exports = Meal