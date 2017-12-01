const $ = require('jquery')

export { appendFood }

function appendFood(foodObject) {
  let name = foodObject.name
  let id = foodObject.id
  $("#list").append(`<li id=${id}> Name: ${name} | Calories: ${foodObject.calories} | <img src="src/delete.svg" class="delete_button" height="20px" width="20px"> </li>`)
}
