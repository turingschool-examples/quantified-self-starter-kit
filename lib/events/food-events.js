const Food             = require('../models/Food')
const helper           = require('./helpers/food-helper')

const hostURL          = 'http://localhost:8080'

const $submit          = $('#add-food')
const $foodFilter      = $('input[name="food-filter"]')
const $foodTable       = $('#foods-table')
const $createFood      = $('#create-food-btn')

let foodCollection

$(document).ready(() => {
  Food.getAllFood()
    .then((foods) => {
      foodCollection = foods.map((food) => {
        return new Food(food)
      }).sort((a,b) => {
        return b.id - a.id
      })
      helper.refreshTable(foodCollection)
    })
})

$submit.on('click', (event) => {
  if (helper.validateInputs() === true) {
    Food.addFood()
      .then((food) => {
        foodCollection.push(food[1])
        helper.clearInputs()
        helper.resetDescriptions()
        $('#foods-table > tbody > tr').eq(0).after(food[0])
      })
  }
})

$foodFilter.on('keyup', (event) => {
  let filter = $foodFilter.val().toLowerCase()
  let filteredFoods = foodCollection.filter((food) => {
    return food.name.toLowerCase().includes(filter)
  })
  helper.refreshTable(filteredFoods)
})

$foodTable.on('click', '.delete-food', function(event) {
  const itemID = parseInt(this.dataset.id)
  foodCollection = foodCollection.filter((food) => {
    return food.id !== itemID
  })
  helper.refreshTable(foodCollection)

  Food.delete(itemID)
})

$foodTable.on('click', '.food-name', function(event) {
  const itemID = this.dataset.id
  this.outerHTML = `<td><input type="text" class="edit-input edit-name"` +
    ` data-id=${itemID} value="${this.innerText}"></td>`
})

$foodTable.on('click', '.food-calories', function(event) {
  const itemID = this.dataset.id
  this.outerHTML = `<td><input type="text" class="edit-input edit-calories"` +
    ` data-id=${itemID} value="${this.innerText}"></td>`
})

$foodTable.on('mouseout', '.edit-name', function(event) {
  const itemID = parseInt(this.dataset.id)
  let food = foodCollection.filter((food) => {return food.id === itemID})
  food[0].name = this.value
  food[0].update()
  helper.refreshTable(foodCollection)
})

$foodTable.on('mouseout', '.edit-calories', function(event) {
  const itemID = parseInt(this.dataset.id)
  let food = foodCollection.filter((food) => {return food.id === itemID})
  food[0].calories = this.value
  food[0].update()
  helper.refreshTable(foodCollection)
})

$createFood.on('click', (event) => {
  window.location.href = hostURL + "/foods.html"
})