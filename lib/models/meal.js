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
		$(`.diary-table-${mealName}`).append(food.toHTML('index'))
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

Meal.calculateCalories = function(mealList) {
	var totalDailyCalories = mealList.reduce(function(sum, meal) {
		return sum + parseInt(meal.totalCalories)
	}, 0)
	var overUnder = 2000 - totalDailyCalories
	$('#total-consumed-calories').text(totalDailyCalories)
    $('#total-remaining-calories').text(overUnder)
    $('#total-goal-calories').text(2000)
    if (overUnder < 0) {
    	$('#total-remaining-calories').css("color", "red")
    } else {
    	$('#total-remaining-calories').css("color", "green")
    }
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
    	alert('Unable to request all meals')
    })
}

Meal.addFoodstoMealTable = function(event) {
	event.preventDefault();

	var mealID = event.target.dataset.id
	var selectedFoods = $(`.diary-foods-table`)[0].childNodes
	var selectedFoodRaw = []
	selectedFoods.forEach(function(food) {
		if (food.children[2].children[0].checked) {
			selectedFoodRaw.push({id: food.children[0].dataset.id, name: food.children[0].innerText, calories: food.children[1].innerText})
		}
	})
	Meal.updateMeals(mealID, selectedFoodRaw)
	var mealTable = event.currentTarget.innerText.toLowerCase()
	Meal.prependFood(mealTable, selectedFoodRaw)
	Meal.updateCalories(mealTable)
}

Meal.updateMeals = function(meal, foods) {
	let mealID = meal; //this needs to remain let, refactor
	foods.forEach(function(food) {
		$.ajax({
			type: "POST",
			url: `https://shrouded-headland-61661.herokuapp.com/api/v1/meals/${mealID}/foods/${food.id}`,
			dataType: "json",
		})
		.done(function(data) {
    	return data;
	    })
	    .fail(function(error) {
	    	alert('Unable to post food to meal')
	    })
	})
}

Meal.prependFood = function(mealTable, FoodIDs) {
	var foodObjects = []
	var mealRef = mealTable
	FoodIDs.forEach(function(food) {
		var foodObject = new Food(food)
		foodObjects.push(foodObject)
	})
	foodObjects.forEach(function(food) {
		$(`.diary-table-${mealRef}`).append(food.toHTML('index'))
	})
}

Meal.deleteFood = function(foodId, mealId) {
    return $.ajax({
    url: `https://shrouded-headland-61661.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`,
    type: 'DELETE',
    dataType: "json",
	})
	.done(function(data) {
    	return data;
	})
	.fail(function(error) {
	   	alert('Unable to post food to meal')
	})
}

Meal.updateCalories = function(mealTable) {
	const goals = { 'breakfast': 400, 'lunch': 600, 'dinner': 800, 'snacks': 200 }
	foodItems = $(`.diary-table-${mealTable}`)[0].children[0].children
	totalCalories = 0;

	for(i = 0; i < foodItems.length; i++) {
		var calories = parseInt(foodItems[i].children[1].innerText)
		totalCalories += calories
	}
	var caloriesRemaining = goals[mealTable] - totalCalories;
	$(`#total-${mealTable}-calories`).text(totalCalories)
	targetElement = $(`#remaining-${mealTable}-calories`)
	targetElement.text(caloriesRemaining)
	if (caloriesRemaining > 0) {
		targetElement.css("color", "green")
	} else {
		targetElement.css("color", "red")
	}

}


module.exports = Meal
