/* @flow */

const {remainingCalSign} = require('../helpers/helpers.js');
const deleteIcon = '../../vendor/assets/delete.png';

class HtmlHelper {
  static mealTableHeader(): string {
    return `<thead class="thead-default">
      <tr>
        <th>Name</th>
        <th>Calories</th>
        <th></th>
      </tr>
    </thead>`;
  }

  static mealTableFooter(meal: Object): string {
    return `<tfoot class="thead-inverse">
      <tr>
        <th>Total Calories</th>
        <th>${meal.totalCalories}</th>
        <th></th>
      </tr>
      <tr>
        <th>Remaining Calories</th>
        <th>
          <span class="remaining ${remainingCalSign(meal.remainingCalories)}">
            ${meal.remainingCalories}
          </span>
        </th>
        <th></th>
      </tr>
    </tfoot>`;
  }

  static allFoodToHTML(foods:Array, diary:bool):string {
    return foods.map((food) => {
      return HtmlHelper.foodRow(food, diary)
    }).join('\n')
  }

  static foodRow(food: object, diary:bool = false):string {
    let html = `<tr class="food-row">` +
      `<td class="food-name" data-id="${food.id}">${food.name}</td>` +
      `<td class="food-calories number" data-id="${food.id}">${food.calories}</td>`;

    if (diary) {
      html += `<td><input data-id="${food.id}" type="checkbox" value="${food.id}"></td></tr>`;
    } else {
      html += `<td><input type="image" src="${deleteIcon}" class="delete-food" data-id="${food.id}"/></td></tr>`;
    }
    return html;
  }

  static mealTable(meal: Object): string {
    return `<div class="col">
      <h2>${meal.name}</h2>
      <table class="table meal-table" data-name=${meal.name} data-id="${meal.id}">
        ${HtmlHelper.mealTableHeader()}
        <tbody>
          ${HtmlHelper.allFoodToHTML(meal.foods)}
          ${HtmlHelper.mealTableFooter(meal)}
        </tbody>
      </table>
    </div>
      `;
  }

  static MealTotalsTable(mealTotals: Object): string {
    return `<div class="col" id="mealTotals">
      <h2>Totals</h2>
      <table class="table">
        <tfoot class="thead-inverse">
          <tr>
            <th>Goal Calories</th>
            <th>${mealTotals.calorieGoal}</th>
          </tr>
          <tr>
            <th>Calories Consumed</th>
            <th>${mealTotals.caloriesConsumed()}</th>
          </tr>
          <tr>
            <th>Remaining Calories</th>
            <th><span class="remaining ${remainingCalSign(mealTotals.remainingCalories())}">${mealTotals.remainingCalories()}</span></th>
          </tr>
        </tfoot>
    </div>`
  }
}

module.exports = HtmlHelper
