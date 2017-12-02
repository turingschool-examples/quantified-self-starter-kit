const requestUrl = "http://localhost:3000/api/v1"

const breakfastGoal = 400
const lunchGoal = 600
const dinnerGoal = 800
const snackGoal = 200

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

module.exports = {getMeals}
