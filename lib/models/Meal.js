/* @flow */

const Food = require('./Food');
const {remainingCalSign} = require('../helpers/helpers.js');
const MealsApi = require('../apis/meals-api');

class Meal {
  id: number;
  name: string;
  totalCalories: number;
  remainingCalories: number;
  foods: Array<Object>;

  constructor(attrs: Object) {
    this.id = attrs.id;
    this.name = attrs.name;
    this.totalCalories = 0;
    this.remainingCalories = this.getCalorieLimits(attrs.name);
    this.foods = [];

    this.buildFoods(attrs.foods);
  }

  getCalorieLimits(name: string): number {
    const limits: { [string]: number } = {
      "Breakfast": 400,
      "Snack": 200,
      "Lunch": 600,
      "Dinner": 800
    }
    return limits[name];
  }

  buildFoods(rawFoods: Object){
    rawFoods.forEach( (food) => {
      this.foods.push(new Food(food));
      this.addCalories(food.calories);
    });
  }

  addFood(food_id: Object) {
    return MealsApi.removeFood(this.id, food_id)
      .then( (data) => {
        // this.foods.push(food);
        // this.addCalories(food.calories);
        return this.mealTableFooter();
      });
  }

  removeFood(food_id: number) {
    return MealsApi.removeFood(this.id, food_id)
      .then( (data) => {
        let food = this.foods.filter( (food) => {
          return food.id == food_id;
        })[0]
        this.foods.splice(this.foods.indexOf(food), 1);
        this.removeCalories(food.calories);
        return this.mealTableFooter();
      })
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
        <th></th>
      </tr>
    </thead>`;
  }

  mealTableFooter(): string {
    return `<tfoot class="thead-inverse">
      <tr>
        <th>Total Calories</th>
        <th>${this.totalCalories}</th>
        <th></th>
      </tr>
      <tr>
        <th>Remaining Calories</th>
        <th>
          <span class="remaining ${remainingCalSign(this.remainingCalories)}">
            ${this.remainingCalories}
          </span>
        </th>
        <th></th>
      </tr>
    </tfoot>`;
  }

  mealTableFoods(): string {
    return this.foods.map( (food) => {
      return this.mealFoodRow(food);
    }).join('\n');
  }

  mealFoodRow(food: Object): string {
    return `<tr data-food_id="${food.id}">
      <td>${food.name}</td>
      <td class="number">${food.calories}</td>
      <td><button class="delete" data-meal_id="${this.id}" data-food_id="${food.id}">X</button></td>
    </tr>`;
  }

  mealTable(): string {
    return `<div class="col">
      <h2>${this.name}</h2>
      <table class="table meal-table" data-name=${this.name} data-id="${this.id}">
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
