const $ = require('jquery')
const url = "https://quantified-self-aabs.herokuapp.com/api/v1/meals"

function mealsResponse() {
  return $.get(url)
}

function addFoodToMeal(mealId, foodId) {
  let postUrl = `${url}/${mealId}/foods/${foodId}`
  return $.post(postUrl)
}

export { mealsResponse, addFoodToMeal }
