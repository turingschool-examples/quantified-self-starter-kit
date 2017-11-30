const $ = require('jquery')

export { appendFood }

function appendFood(foodObject) {
  $("#list").append(`<li> Name: ${foodObject.name} | Calories: ${foodObject.calories} | delete_icon.png </li>`)
}
