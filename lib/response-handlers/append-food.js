const $ = require('jquery')

export { appendFood }

function appendFood(foodObject) {
  let name = foodObject.name
  let id = foodObject.id
  let tableRowOne = `<td>${name}</td>`
  let tableRowTwo = `<td>${foodObject.calories}</td>`
  let tableRowThree =  `<td><img src="src/delete.svg" class="delete_button" height="20px" width="20px"></td>`
  let table = `<tr id=${id}></tr>`
  $("#list")
  .append(table + tableRowOne + tableRowTwo + tableRowThree)
}
