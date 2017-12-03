const $ = require('jquery')

export { appendMeal, appendCalories, appendMealTotals }

function appendMeal(mealObject) {
  let name = mealObject.name
  let id = mealObject.id
  let headers = "<th>Name</th><th>Calories</th><th></th>"
  let div = `<div class='mealtable'> <h2> ${name} </h2> <table class='list' id='${name}'> ${headers} </table> </div> <br>`
  $('.allmeals').append(div)
}

function appendCalories(name) {
  let mealTable = $(`#${name}`)
  mealTable.append(`<tr> <td> Total Calories </td> <td colspan='2' class='total-meal-cals' id='${name}-calories'></td> </tr>`)
  mealTable.append(`<tr> <td> Remaining Calories </td> <td colspan='2' class='remaining-calories' id='${name}-remaining'></td> </tr>`)
}

function appendMealTotals() {
  let mealTotalsTable = $('.meal-totals')
  mealTotalsTable.append('<tr> <td>Goal Calories</td> <td id="total-goal-cals">2000</td> </tr>')
  mealTotalsTable.append('<tr> <td>Calories Consumed</td> <td id="all-cals-consumed"></td> </tr>')
  mealTotalsTable.append('<tr> <td>Remaining Calories</td> <td id="total-cals-remaining"></td> </tr>')
}
