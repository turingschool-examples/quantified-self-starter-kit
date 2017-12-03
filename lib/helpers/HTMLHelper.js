const $ = require('jquery')

module.exports = class HTMLHelper{

  static newFoodMealTableEntry(val) {
    return `
      <tr class='table-row'>
        <td class='food-meal-checkbox ${val['id']}'>
          <input class='add-to-meal-checkbox' id="checkBox ${val['id']}" type="checkbox">
        </td>
        <td class='table-name ${val['id']}'>${val['name']}</td>
        <td class='table-cal ${val['id']}'>${val['calories']}</td>
      </tr>`
  }

  static newTableDiv(data){
    return`
      <div class='${data.name} meals-table'>
      <tr>
        <table class='${data.name}-table meal-table'>
          <thead>
            <p class='meal-table-title'><strong>${data.name}</strong></p>
              <tr>
                <th class='meal-table-header'>Name</th>
                <th class='meal-table-header'>Calories</th>
              </tr>
            </thead class='${data.name}-thead meal-table-head'>
          <tfoot class='${data.name}'>
          </tfoot>
          <tbody class='${data.name}-tbody ${data.id} meal-table-body'>
          </tbody>
          <tfoot class='${data.name}-tfoot meal-table-footer'
          </tfoot>
        </table>
      </tr>
    `
  }

  static newTableRow(meal, val){
    return `
      <tr class='table-row'>
        <td class='table-name ${val['id']}'>${val['name']}</td>
        <td class='${meal.name}-calories-row table-cal ${val['id']}'>
          <span class='killer'><i class='fa fa-minus-circle delete-button delete-food ${val['id']} meal ${meal.id}' id='${meal.name}' aria-hidden='true' style='font-size:24px'></i></span>
          ${val['calories']}
        </td>
      </tr>`
  }
  static totalMealCalories(val) {
    return `
      <tr class='table-row meal-calories'>
        <td class='${val.name}-calories-header meal-cals-header' id='${val.id}'>Total Calories</td>
        <td class='${val.name}-calories meal-cals-val total-meal-calories' id='${val.id}'>0</td>
      </tr>
      <tr class='table-row meal-calories-remaining'>
        <td class='${val.name}-remaing-calories-header meal-cals-header' id='${val.id}'>Remaining Calories</td>
        <td class='${val.name}-remaining-calories meal-cals-val rem-meal-cals' id='${val.id}'>0</td>
      </tr>`
  }
}
