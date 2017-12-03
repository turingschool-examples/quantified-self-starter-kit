const $ = require('jquery')
import { renderMeals, renderAllCals, renderMealTotals } from '../response-handlers/all_meal_objects.js'
// $('td.remaining-calories').each( (index, val) => {
//   console.log(val)
// })

$(document).ready(() => {

  renderMeals()
  renderMealTotals()

  $(document).on({
    blur: function () {
      let meal = $(this).parents('table').attr('id')
      renderAllCals(meal)
     }
  }, '.calories')

})







// $(`#${name} td.calories`).each( (index, val) => {
// calories.push(parseInt(val.innerHTML))
// })
