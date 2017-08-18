const Food             = require('../models/Food')
const $submit          = $('#add-food')
const $nameInput       = $('input[name="food-name"]')
const $caloriesInput   = $('input[name="food-calories"]')
const $nameDescription = $('#name-description')
const $calDescription  = $('#calories-description')

$(document).ready(() => {
  Food.allFoodToHTML()
    .then(function(foodHTML) {
      $('#foods-table').append(foodHTML)
    })
})

$submit.on('click', () => {
  if ($nameInput.val() === '') {
    $nameDescription.text('Error: Please enter a name')
  } else if ($caloriesInput.val() === '') {
    $calDescription.text('Error: Please enter a calorie amount')
  } else {
    Food.addFood()
      .then((foodHTML) => {
        clearInputs()
        resetDescriptions()
        $('#foods-table > tbody > tr').eq(0).after(foodHTML)
      })
  }
})
  
const clearInputs = () => {
  $nameInput.val('')
  $caloriesInput.val('')
}

const resetDescriptions = () => {
  $nameDescription.text('Please enter a name')
  $calDescription.text('Please enter a calorie amount')
}