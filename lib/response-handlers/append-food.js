const $ = require('jquery')

export { appendFood, appendFoodsToMeals }

function appendFood(foodObject, element, page) {
  let name = foodObject.name
  let id = foodObject.id
  let tableRowOne = `<td  class='foodinfo name'>${name}</td>`
  let tableRowTwo = `<td class='foodinfo calories'>${foodObject.calories}</td>`
  let tableRowThree = `<td><img src="/src/x-button.svg" class="${page}_delete_button" height="20px" width="20px"></td>`
  let table = `<tr id=${id}> ${tableRowOne} ${tableRowTwo} ${tableRowThree} </tr>`
  $(element).append(table)
}

function appendFoodsToMeals(foodObject, element) {
  let name = foodObject.name
  let id = foodObject.id
  let tableRowOne = `<td><input type="checkbox" id="${id}" name="${name}"></td>`
  let tableRowTwo = `<td  class='foodinfo name'>${name}</td>`
  let tableRowThree = `<td class='foodinfo calories'>${foodObject.calories}</td>`
  let table = `<tr id=${id}> ${tableRowOne} ${tableRowTwo} ${tableRowThree} </tr>`
  $(element).append(table)
}
