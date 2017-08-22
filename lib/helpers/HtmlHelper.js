/* @flow */

const {remainingCalSign} = require('../helpers/helpers.js');

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

  static mealTableFoods(meal: object): string {
    return meal.foods.map( (food) => {
      return HtmlHelper.mealFoodRow(food, meal);
    }).join('\n');
  }

  static mealFoodRow(food: Object, meal: Object): string {
    return `<tr data-food_id="${food.id}">
      <td>${food.name}</td>
      <td class="number">${food.calories}</td>
      <td><button class="delete" data-meal_id="${meal.id}" data-food_id="${food.id}">X</button></td>
    </tr>`;
  }

  static mealTable(meal: Object): string {
    return `<div class="col">
      <h2>${meal.name}</h2>
      <table class="table meal-table" data-name=${meal.name} data-id="${meal.id}">
        ${HtmlHelper.mealTableHeader()}
        <tbody>
          ${HtmlHelper.mealTableFoods(meal)}
          ${HtmlHelper.mealTableFooter(meal)}
        </tbody>
      </table>
    </div>
      `;
  }
}

module.exports = HtmlHelper
