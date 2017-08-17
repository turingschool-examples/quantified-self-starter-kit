const Food   = require('../models/Food')
const $submit = $('#add-food')

$(document).ready(() => {
  Food.allFoodToHTML()
    .then(function(foodHTML) {
      $('#foods-table').append(foodHTML)
    })
})

$submit.on('click', () => {
  Food.addFood()
    .then((foodHTML) => {
      $('input[name="food-name"]').val('')
      $('input[name="food-calories"]').val('')
      $('#foods-table').append(foodHTML)
    })
})