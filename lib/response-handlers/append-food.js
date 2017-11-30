const $ = require('jquery')

export { appendFood }

function appendFood(foodObject) {
  let name = foodObject.name
  $("#list").append(`<li> Name: ${name} | Calories: ${foodObject.calories} | <img src="src/delete.svg" id="delete-button" height="20px" width="20px"> </li>`)
}
