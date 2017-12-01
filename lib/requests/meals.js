const requestUrl = "http://localhost:3000/api/v1"

const tableRow = function(food, calories) {
  return `<tr><td>${food}</td><td>${calories}</td></tr>`
}

const getMeals = () => {
  $.get(`${requestUrl}/meals`)
  .then(function(meals){
    meals.forEach(function(meal){
      meal["foods"].forEach(function(item) {
        console.log(item)
        let food = item["name"]
        let calories = item["calories"]
        $(`#${meal["name"].toLowerCase()}-table`).append(tableRow(food, calories))
      })
    })
  })
}

module.exports = {getMeals}
