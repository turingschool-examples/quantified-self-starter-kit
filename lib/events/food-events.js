const Food = require('../models/Food')

$(document).ready(() => {
  Food.allFoodToHTML()
    .then((foodHTML) => {
      console.log(foodHTML)
      //append html here
    })
})