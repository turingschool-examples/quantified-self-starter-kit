const Food = require('../models/Food')

$(document).ready(() => {
  Food.allFoodToHTML()
    .then(function(foodHTML) {
      $('#foods-table').append(foodHTML)
    })
})