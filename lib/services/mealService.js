const $ = require('jQuery');
const Food = require('../models/food');
const API = 'https://ml-quantified-self.herokuapp.com/api/v1/'

class MealService {
  constructor() {
    this.total = 0
  }

  addMeals() {
    let $mealsTables = $('#meals-tables');
    fetch(API + 'meals')
      .then(response => response.json())
      .then(data => {
        data.forEach((table) => {
          let newTable = $(`<table id="meals-${table["name"].toLowerCase()}"><caption>${table["name"]}</caption></table>`)
          $mealsTables.append(newTable)
          newTable.append('<tr><th>Name</th><th>Calories</th></tr>')
          table["foods"].forEach((food) => {
            this.addFood(food["id"], food["name"], food["calories"], table["name"].toLowerCase())
          })
          this.addTotalCalories(table["name"].toLowerCase())
        })
      }).then(data => { this.initializeTotalsTable() })
  }

  addFood(id, name, calories, mealName, bottom=true) {
    let newRow = $(`<tr class="${mealName}-${id}"></tr>`)
    if (bottom) {
      $(`#meals-${mealName}`).append(newRow);
    } else {
      $(newRow).insertAfter('#meal-table-headers');
    }
    this.addInfo(id, name, calories, newRow)
  }

  addInfo(id, name, calories, targetNode) {
    targetNode.append(`<td class="food-name" data-id="${id}">${name}</td>`)
    targetNode.append(`<td class="food-calories" data-id="${id}">${calories}</td>`)
    targetNode.append(`<td><img class="delete-food" data-id="${id}" src="./lib/assets/delete1.png"></td>`)
  }

  addTotalCalories(tableName) {
    let $table = $(`table#meals-${tableName}`)
    let $calories = $(`table#meals-${tableName} td.food-calories`)
    let subtotal = 0
    $calories.each((ind, calorie) => {
      subtotal += parseInt(calorie.textContent)
    })
    this.total += subtotal
    $table.append(`<tr class='darker'><td>Total Calories</td><td class="total">${subtotal}</td></td>`)
    let remaining = this.remainingCalories(tableName, subtotal)
    let color = this.colorOfRemaining(remaining)
    let remainingElement = $(`<tr class='darker'><td>Remaining Calories</td><td class=${color}>${remaining}</td></tr>`)
    $table.append(remainingElement)
  }

  remainingCalories(tableName, total) {
    if (tableName == "snack") {
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

  colorOfRemaining(remaining) {
    if (remaining > 0) {
      return "green"
    } else {
      return "red"
    }
  }

  initializeTotalsTable() {
    let remaining = 2000 - this.total
    let $remainingBox = $('#remaining-calories')
    $('#calories-consumed').text(this.total)
    $remainingBox.text(remaining)
    $remainingBox.addClass(this.colorOfRemaining(remaining))
  }

}

module.exports = new MealService
