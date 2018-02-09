const $ = require('jQuery');
const Food = require('../models/food');
const API = 'https://ml-quantified-self.herokuapp.com/api/v1/'

class MealService {
  constructor() {
    this._total = 0
    this._arrayOfFood = []
  }

  arrayOfFood(event) {
    if (event.target.checked) {
      this._arrayOfFood.push(event.target.value)
    } else {
      this._arrayOfFood = this._arrayOfFood.filter(e => e !== event.target.value);
    }
  }

  addMeals() {
    let $mealsTables = $('#meals-tables');
    fetch(API + 'meals')
      .then(response => response.json())
      .then(data => {
        data.forEach((table) => {
          let newTable = $(`<table class="meal" data-id=${table["id"]}><caption>${table["name"]}</caption></table>`)
          $mealsTables.append(newTable)
          newTable.append('<tr><th>Name</th><th>Calories</th></tr>')
          table["foods"].forEach((food) => {
            this.addFood(food["id"], food["name"], food["calories"], table["id"])
          })
          this.addTotalCalories(table["id"])
        })
      }).then(data => { this.initializeTotalsTable() })
  }

  addFood(id, name, calories, mealId, bottom=true) {
    let $newRow = $(`<tr data-id=${mealId}></tr>`)
    $(`.meal[data-id=${mealId}]`).append($newRow)
    this.addInfo(id, name, calories, $newRow)
  }

  addInfo(id, name, calories, targetNode) {
    targetNode.append(`<td class="food-name" data-id="${id}">${name}</td>`)
    targetNode.append(`<td class="food-calories" data-id="${id}">${calories}</td>`)
    targetNode.append(`<td><img class="delete-food" data-id="${id}" src="./lib/assets/delete1.png"></td>`)
  }

  addTotalCalories(id) {
    let $table = $(`table.meal[data-id=${id}]`)
    let $calories = $table.find('td.food-calories')
    let subtotal = 0
    $calories.each((ind, calorie) => {
      subtotal += parseInt(calorie.textContent)
    })
    this._total += subtotal
    $table.append(`<tr class='darker'><td>Total Calories</td><td class="total">${subtotal}</td></td>`)
    let remaining = this.remainingCalories(id, subtotal)
    let color = this.colorOfRemaining(remaining)
    let remainingElement = $(`<tr class='darker'><td>Remaining Calories</td><td class=${color}>${remaining}</td></tr>`)
    $table.append(remainingElement)
  }

  remainingCalories(id, total) {
    if (id === 2) {
      return 200 - total
    } else if (id === 1) {
      return 400 - total
    } else if (id === 3) {
      return 600 - total
    } else if (id === 4) {
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
    let remaining = 2000 - this._total
    let $remainingBox = $('#remaining-calories')
    $('#calories-consumed').text(this._total)
    $remainingBox.text(remaining)
    $remainingBox.addClass(this.colorOfRemaining(remaining))
  }

  deleteFromMeal(mealId, foodId) {
    debugger
    fetch(API + `meals/${mealId}/foods/${foodId}` , { method: 'DELETE' })
      .then(response => { debugger })
  }

  sendFood(mealId) {
    this._arrayOfFood.forEach((foodId) => {
      $(`table#foods-table input[value=${foodId}]`)[0].checked = false
      this.updateMeals(mealId)
      this.postFood(mealId, foodId)
      this._arrayOfFood = []
    })
  }

  postFood(mealId, foodId) {
    fetch(API + `meals/${mealId}/foods/${foodId}`,{
      method: "POST"
    })
    .then(response => response.json())
    .then(data => {
      let $foodRow = $(`table#foods-table .food-${foodId}`)
      let $name = $foodRow.find('.food-name').text()
      let $calories = $foodRow.find('.food-calories').text()
      let $newRow = $(`<tr data-id=${mealId}></tr>`)
      let $lastTotal = $(`.meal[data-id=${mealId}]`).find('.darker')[0]
      $newRow.insertBefore($lastTotal)
      this.addInfo(mealId, $name, $calories, $newRow)
    })
  }

  updateMeals(id) {
    debugger
    let $table = $(`table.meal[data-id=${id}]`)
    $table.find('.darker').remove()
    let $calories = $table.find('td.food-calories')
    let subtotal = 0
    $calories.each((ind, calorie) => {
      subtotal += parseInt(calorie.textContent)
    })
    this._total += subtotal
    $table.append(`<tr class='darker'><td>Total Calories</td><td class="total">${subtotal}</td></td>`)
    let remaining = this.remainingCalories(parseInt(id), subtotal)
    let color = this.colorOfRemaining(remaining)
    let remainingElement = $(`<tr class='darker'><td>Remaining Calories</td><td class=${color}>${remaining}</td></tr>`)
    $table.append(remainingElement)
  }

}

module.exports = new MealService
