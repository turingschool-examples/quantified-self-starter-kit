const Food = require('./Food');
const {remainingCalSign} = require('../helpers/helpers.js');

class Meal {
  constructor(attrs) {
    this.name = attrs.name;
    this.totalCalories = 0;
    this.remainingCalories = 400;
    this.foods = [];

    this.buildFoods(attrs.foods);
  }

  buildFoods(rawFoods){
    rawFoods.forEach( (food) => {
      this.addFood(new Food(food));
    });
  }

  addFood(food) {
    // need ajax call to add Food to DB
    this.foods.push(food);
    this.addCalories(food.calories);
  }

  removeFood(food) {
    // need ajax call to add Food to DB
    this.foods.splice(this.foods.indexOf(food), 1);
    this.removeCalories(food.calories);
  }

  addCalories(calories) {
    this.totalCalories += calories;
    this.remainingCalories -= calories;
  }

  removeCalories(calories) {
    this.totalCalories -= calories;
    this.remainingCalories += calories;
  }

  mealTableHeader() {
    return `<thead class="thead-default">
      <tr>
        <th>Name</th>
        <th>Calories</th>
      </tr>
    </thead>`;
  }

  // remainingCalSign() {
  //   return this.remainingCalories >= 0 ? 'positive' : 'negative';
  // }

  mealTableFooter() {
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

  mealTableFoods() {
    return this.foods.map( (food) => {
      return this.mealFoodRow(food);
    }).join('\n');
  }

  mealFoodRow(food) {
    return `<tr>
      <td>${food.name}</td>
      <td class="number">${food.calories}</td>
    </tr>`;
  }

  mealTable() {
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
