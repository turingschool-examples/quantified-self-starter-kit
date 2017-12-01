const requestUrl = "http://localhost:3000/api/v1"

const tableRow = function(food, calories) {
  return `<tr><td>${food}</td><td>${calories}</td></tr>`
}

const getMeals = () => {
  $.get(`${requestUrl}/meals`)
  .then(function(meals){
    meals.forEach(function(meal){
      console.log(meal)
      if(meal["name"] === "Breakfast") {
        meal["foods"].forEach(function(item) {
          const food = item["name"]
          const calories = item["calories"]
          $("#breakfast-table").append(tableRow(food, calories))
        })
      }
      if(meal["name"] === "Lunch") {
        meal["foods"].forEach(function(item) {
          const food = item["name"]
          const calories = item["calories"]
          $("#lunch-table").append(tableRow(food, calories))
        })
      }
      if(meal["name"] === "Dinner") {
        meal["foods"].forEach(function(item) {
          const food = item["name"]
          const calories = item["calories"]
          $("#dinner-table").append(tableRow(food, calories))
        })
      }
      if(meal["name"] === "Snack") {
        meal["foods"].forEach(function(item) {
          const food = item["name"]
          const calories = item["calories"]
          $("#snack-table").append(tableRow(food, calories))
        })
      }
    })
  })
}

module.exports = {getMeals}
