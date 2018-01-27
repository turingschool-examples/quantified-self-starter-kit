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
          MealService.addTotalCalories(table["name"].toLowerCase())
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

  static addTotalCalories(tableName) {
    let $calories = $(`table#meals-${tableName} td.food-calories`)
    let total = 0
    $calories.each((ind, calorie) => {
      if (isNaN(total)) {
        total = parseInt(calorie.textContent)
      } else {
        total += parseInt(calorie.textContent)
      }
    })
    $(`table#meals-${tableName}`).append(`<tr class='darker'><td>Total Calories</td><td>${total}</td></td>`)
    $(`table#meals-${tableName}`).append(`<tr class='darker'><td>Remaining Calories</td><td>${MealService.remainingCalories(tableName, total)}</td></tr>`)
  }

  static remainingCalories(tableName, total) {
    console.log(tableName)
    if (tableName == "snacks") {
      return 200 - total
    } else if (tableName == "breakfast") {
      return 400 - total
    } else if (tableName == "lunch") {
      return 600 - total
    } else if (tableName == "dinner") {
      return 800 - total
    } else { 
      return "N/A"
    }
  }
}
