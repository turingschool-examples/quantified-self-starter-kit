const $ = require('jquery')

export { appendMeal }

function appendMeal(mealObject) {
  let name = mealObject.name
  let id = mealObject.id
  let headers = "<th>Name</th><th>Calories</th><th></th>"
  let div = `<div class='mealtable'> <h2> ${name} </h2> <table class='list' id='meal-${id}'> ${headers} </table> </div> <br>`
  $('.allmeals').append(div)
}
