/* @flow */

const {remainingCalSign} = require('../helpers/helpers.js');

class MealTotals {
  calorieGoal: number;
  meals: Array<Object>;

  constructor( attrs: Object = {} ) {
    this.calorieGoal = attrs.goal || 2000;
    this.meals = attrs.meals || [];
  }

  caloriesConsumed(): number {
    return this.meals.reduce( (sum: number, meal: Object)=> {
      sum += meal.totalCalories;
      return sum;
    }, 0)
  }

  remainingCalories() {
    return this.meals.reduce( (remaining: number, meal: Object)=> {
      remaining -= meal.totalCalories;
      return remaining;
    }, this.calorieGoal)
  }

  toHtml() {
    return `<div class="col" id="mealTotals">
      <h2>Totals</h2>
      <table class="table">
        <tfoot class="thead-inverse">
          <tr>
            <th>Goal Calories</th>
            <th>${this.calorieGoal}</th>
          </tr>
          <tr>
            <th>Calories Consumed</th>
            <th>${this.caloriesConsumed()}</th>
          </tr>
          <tr>
            <th>Remaining Calories</th>
            <th><span class="remaining ${remainingCalSign(this.remainingCalories())}">${this.remainingCalories()}</span></th>
          </tr>
        </tfoot>
    </div>`
  }
}

module.exports = MealTotals
