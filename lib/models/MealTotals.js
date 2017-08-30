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
}

module.exports = MealTotals
