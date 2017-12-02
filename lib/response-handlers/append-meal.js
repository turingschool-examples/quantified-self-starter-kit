const $ = require('jquery')

export { appendMeal, appendCalories }

function appendMeal(mealObject) {
  let name = mealObject.name
  let id = mealObject.id
  let headers = "<th>Name</th><th>Calories</th><th></th>"
  let div = `<div class='mealtable'> <h2> ${name} </h2> <table class='list' id='${name}'> ${headers} </table> </div> <br>`
  $('.allmeals').append(div)
}

function appendCalories(name) {
  let mealTable = $(`#${name}`)
  mealTable.append(`<tr> <td> Total Calories </td> <td colspan='2' id='${name}-calories'></td> </tr>`)
  mealTable.append(`<tr> <td> Remaining Calories </td> <td colspan='2' id='${name}-remaining'></td> </tr>`)
}
