const Food             = require('../models/Food')
const helper           = require('./helpers/food-helper')

const $submit          = $('#add-food')
const $foodFilter      = $('input[name="food-filter"]')
const $foodTable       = $('#foods-table')

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
  const itemID = parseInt(this.id)
  foodCollection = foodCollection.filter((food) => {
    return food.id !== itemID
  })
  helper.refreshTable(foodCollection)

  Food.delete(itemID)
})