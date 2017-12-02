const $ = require('jquery')

export { appendFood }

function appendFood(foodObject, element) {
  let name = foodObject.name
  let id = foodObject.id
  let lowerCaseName = name.toLowerCase().split(' ').join('')
  let tableRowOne = `<td  class='foodinfo name' rel='${lowerCaseName}'>${name}</td>`
  let tableRowTwo = `<td class='foodinfo calories'>${foodObject.calories}</td>`
  let tableRowThree = `<td><img src="src/delete.svg" class="delete_button" height="20px" width="20px"></td>`
  let table = `<tr id=${id}> ${tableRowOne} ${tableRowTwo} ${tableRowThree} </tr>`
  $(element).append(table)
}
