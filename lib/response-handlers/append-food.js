const $ = require('jquery')

export { appendFood }

function appendFood(foodObject) {
  let name = foodObject.name
  let id = foodObject.id
  let tableRowOne = `<td class='foodinfo'>${name}</td>`
  let tableRowTwo = `<td class='foodinfo'>${foodObject.calories}</td>`
  let tableRowThree = `<td><img src="src/delete.svg" class="delete_button" height="20px" width="20px"></td>`
  let table = `<tr id=${id}> ${tableRowOne} ${tableRowTwo} ${tableRowThree} </tr>`
  $("#list").append(table)
}
