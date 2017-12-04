const $ = require('jquery')
import { renderMeals, renderAllCals, renderMealTotals, renderTotalCalsTable } from '../response-handlers/all_meal_objects.js'
import { addFoodToMeal } from '../ajax-requests/meal-requests.js'
// $('td.remaining-calories').each( (index, val) => {
//   console.log(val)
// })

$(document).ready(() => {

  renderMeals()
  renderMealTotals()

  $(document).on({
    blur: function (event) {
      let meal = $(this).parents('table').attr('id')
      renderAllCals(meal)
      renderTotalCalsTable()
      event.preventDefault()
     }
  }, '.calories')

  $(document).on({
    click: function (event) {
      event.preventDefault()
      let mealId = this.id
      // let foodId = []
      let foodIds = getCheckedFoods()
      let promiseArray = []
      for(let i = 0; i < foodIds.length; i++) {
        promiseArray.push(addFoodToMeal(mealId, foodIds[i]))
        // console.log(`post${[i]}`)
      }
      Promise.all(promiseArray).then(
        updatePage()
      )
    }
  }, '.add-food-to-meal')

})

function getCheckedFoods() {
    let foodIds = []
    $(':checked').each((index, val) => {
        foodIds.push(val.id)
    })
    return foodIds
}

function updatePage() {
  clearCheckBoxes()
  clearMealTables()
  renderMeals()
  renderMealTotals()
  renderTotalCalsTable()
}

function clearMealTables() {
  $('.allmeals').empty()
  $('.meal-totals').empty()
}

function clearCheckBoxes() {
  $('input:checkbox').removeAttr('checked')
}
