const requestUrl = "http://localhost:3000/api/v1"

const totalGoalCalories = 2000

const tableRow = (food, calories) => {
  return `<tr><td>${food}</td><td>${calories}</td></tr>`
}

const totalCaloriesRow = (calories) => {
  return`<tr><th>Total Calories</th><td>${calories}</td></tr>`
}

const remainingCaloriesRow = (calories) => {
  const color = ""
  if(calories >= 0){
    return`<tr><th>Remaining Calories</th><td class="remaining-calories" style="color: green;">${calories}</td></tr>`
  } else {
    return`<tr><th>Remaining Calories</th><td class="remaining-calories" style="color: red;">${calories}</td></tr>`
  }
}

const getMeals = () => {
  $.get(`${requestUrl}/meals`)
  .then(function(meals){
    populateTable(meals)
    calculateCalories(meals)
    generateTotals(meals)
    getAllFoods()
  })
}

const populateTable = (meals) => {
  meals.forEach(function(meal){
    meal["foods"].forEach(function(item) {
      let food = item["name"]
      let calories = item["calories"]
      $(`#${meal["name"].toLowerCase()}-table`).append(tableRow(food, calories))
    })
  })
}

const calculateCalories = (meals) => {
  meals.forEach(function(meal){
    let totalCalories = 0
    meal["foods"].forEach(function(item){
      totalCalories += item["calories"]
    })
    let remainingCalories = getRemainingCalories(meal, totalCalories)
    $(`#${meal["name"].toLowerCase()}-table`).append(totalCaloriesRow(totalCalories))
    $(`#${meal["name"].toLowerCase()}-table`).append(remainingCaloriesRow(remainingCalories))
  })
}

const getRemainingCalories = (meal, totalCalories) => {
  if(meal["name"] == "Breakfast"){
    return 400 - totalCalories
  } else if(meal["name"] == "Lunch"){
    return 600 - totalCalories
  } else if(meal["name"] == "Dinner"){
    return 800 - totalCalories
  } else if(meal["name"] == "Snack"){
    return 200 - totalCalories
  }
}

const generateTotals = (meals) => {
  let total = calculateTotal(meals)
  let remaining = totalGoalCalories - total
  $('#consumed-calories').html(`${total}`)
  $('#total-remaining-calories').html(`${remaining}`)
  if(remaining >= 0) {
    $('#total-remaining-calories').css("color", "green")
  } else {
    $('#total-remaining-calories').css("color", "red")
  }
}

const calculateTotal = (meals) => {
  let totalMealCalories = 0
  meals.forEach(function(meal){
    let calories = 0
    meal["foods"].forEach(function(item){
      calories += item["calories"]
    })
    totalMealCalories += calories
  })
  return totalMealCalories
}

const getAllFoods = () => {
  $.get(`${requestUrl}/foods`)
  .then(function(foods){
    foods.forEach(function(food){
      $("#diary-food-table").append(foodsTableRow(food))
    })
  })
}

const foodsTableRow = (food) => {
  return `<tr id="${food.id}"><td><input type="checkbox"/></td><td class="food-item" >${food["name"]}</td><td>${food["calories"]}</td></tr>`
}

$("#food-search").bind("keyup", function() {
    var text = $(this).val().toLowerCase();
    var foodItem = $(".food-item");

    foodItem.parent().hide();

    foodItem.filter(function () {
        return $(this).text().toLowerCase().indexOf(text) == 0;
    }).parent().show();
});

module.exports = {getMeals}
