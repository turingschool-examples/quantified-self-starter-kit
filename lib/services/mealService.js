const $ = require('jQuery');
const Food = require('../models/food');
const API = 'https://ml-quantified-self.herokuapp.com/api/v1/'

module.exports = class MealService {

  static addMeals() {
    let $mealsTables = $('#meals-tables');
    fetch(API + 'meals')
      .then(response => response.json())
      .then(data => {
        data.forEach((table) => {
          let newTable = $(`<table id="meals-${table["name"].toLowerCase()}"><caption>${table["name"]}</caption></table>`)
          $mealsTables.append(newTable)
          newTable.append('<tr><th>Name</th><th>Calories</th></tr>')
          table["foods"].forEach((food) => {
            MealService.addFood(food["id"], food["name"], food["calories"], table["name"].toLowerCase())
          })
        })
      })
  }

  static addFood(id, name, calories, mealName, bottom=true) {
    let newRow = $(`<tr class="${mealName}-${id}"></tr>`)
    if (bottom) {
      $(`#meals-${mealName}`).append(newRow);
    } else {
      $(newRow).insertAfter('#meal-table-headers');
    }
    MealService.addInfo(id, name, calories, newRow)
  }

  static addInfo(id, name, calories, targetNode) {
    targetNode.append(`<td class="food-name" data-id="${id}">${name}</td>`)
    targetNode.append(`<td class="food-calories" data-id="${id}">${calories}</td>`)
    targetNode.append(`<td><img class="delete-food" data-id="${id}" src="./lib/assets/delete1.png"></td>`)
  }
}
