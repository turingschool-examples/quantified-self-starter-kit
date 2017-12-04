const $ = require('jquery')
import { renderMeals, renderAllCals, renderMealTotals, renderTotalCalsTable } from '../response-handlers/all_meal_objects.js'
import { addFoodToMeal, deleteFoodfromMeal } from '../ajax-requests/meal-requests.js'

$(document).ready(() => {

  renderMeals()
  renderMealTotals()

  $(document).on({
    blur: function (event) {
      event.preventDefault()
      let meal = $(this).parents('table').attr('id')
      renderAllCals(meal)
      renderTotalCalsTable()
     }
  }, '.calories')

  $(document).on({
    click: function (event) {
      event.preventDefault()
      let mealId = this.id
      let foodIds = getCheckedFoods()
      let promiseArray = []
      for(let i = 0; i < foodIds.length; i++) {
        promiseArray.push(addFoodToMeal(mealId, foodIds[i]))
      }
      Promise.all(promiseArray).then( function() {
        updatePage()
      }
      )
    }
  }, '.add-food-to-meal')

  $(document).on({
    mouseenter: function () {
      $(this).prop("src", "src/x-button.svg")
    },
    mouseleave: function () {
      $(this).prop("src", "src/delete.svg")
    },
    click: function () {
      let food_id = $(this).parents("tr").attr('id')
      let meal_id = $(this).parents("table").attr("rel")
      let mealName = $(this).parents('table').attr('id')
      deleteFoodfromMeal(meal_id, food_id).then(
        $(this).parents('tr').remove(),
        renderAllCals(mealName),
        renderTotalCalsTable()
      )
    }
  }, '.meal_food_delete_button')

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
  renderMeals()
  // renderMealTotals()
  clearMealTables()
  // renderTotalCalsTable()
}

function clearMealTables() {
  $('.allmeals').empty()
  // $('.meal-totals').empty()
}

function clearCheckBoxes() {
  $('*:checkbox').prop('checked', false)
}
