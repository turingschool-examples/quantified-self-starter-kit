/* @flow */

const Food = require('./Food');
const {remainingCalSign} = require('../helpers/helpers.js');

class Meal {
  name: string;
  totalCalories: number;
  remainingCalories: number;
  foods: Array<Object>;

  constructor(attrs: Object) {
    this.name = attrs.name;
    this.totalCalories = 0;
    this.remainingCalories = 400;
    this.foods = [];

    this.buildFoods(attrs.foods);
  }

  buildFoods(rawFoods: Object){
    rawFoods.forEach( (food) => {
      this.addFood(new Food(food));
    });
  }

  addFood(food: Object) {
    // need ajax call to add Food to DB
    this.foods.push(food);
    this.addCalories(food.calories);
  }

  removeFood(food: Object) {
    // need ajax call to add Food to DB
    this.foods.splice(this.foods.indexOf(food), 1);
    this.removeCalories(food.calories);
  }

  addCalories(calories: number) {
    this.totalCalories += calories;
    this.remainingCalories -= calories;
  }

  removeCalories(calories: number) {
    this.totalCalories -= calories;
    this.remainingCalories += calories;
  }

  mealTableHeader(): string {
    return `<thead class="thead-default">
      <tr>
        <th>Name</th>
        <th>Calories</th>
      </tr>
    </thead>`;
  }

  mealTableFooter(): string {
    return `<tfoot class="thead-inverse">
      <tr>
        <th>Total Calories</th>
        <th>${this.totalCalories}</th>
      </tr>
      <tr>
        <th>Remaining Calories</th>
        <th>
          <span class="remaining ${remainingCalSign(this.remainingCalories)}">
            ${this.remainingCalories}
          </span>
        </th>
      </tr>
    </tfoot>`;
  }

  mealTableFoods(): string {
    return this.foods.map( (food) => {
      return this.mealFoodRow(food);
    }).join('\n');
  }

  mealFoodRow(food: Object): string {
    return `<tr>
      <td>${food.name}</td>
      <td class="number">${food.calories}</td>
    </tr>`;
  }

  mealTable(): string {
    return `<div class="col" id=${this.name}>
      <h2>${this.name}</h2>
      <table class="table">
        ${this.mealTableHeader()}
        <tbody>
          ${this.mealTableFoods()}
          ${this.mealTableFooter()}
        </tbody>
      </table>
    </div>
      `;
  }

}

module.exports = Meal
