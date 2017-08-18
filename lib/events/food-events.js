const Food             = require('../models/Food')
const helper           = require('./helpers/food-helper')

const $submit          = $('#add-food')
const $foodFilter      = $('input[name="food-filter"]')
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

$submit.on('click', () => {
  if (validateInputs() === true) {
    Food.addFood()
      .then((foodHTML) => {
        helper.clearInputs()
        helper.resetDescriptions()
        $('#foods-table > tbody > tr').eq(0).after(foodHTML)
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