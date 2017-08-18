const {remainingCalSign} = require('../helpers/helpers.js');

class MealTotals {
  constructor( attrs = {} ) {
    this.calorieGoal = attrs.goal || 2000;
    this.meals = attrs.meals || [];
  }

  caloriesConsumed() {
    return this.meals.reduce( (sum, meal)=> {
      sum += meal.totalCalories;
      return sum;
    }, 0)
  }

  remainingCalories() {
    return this.meals.reduce( (remaining, meal)=> {
      remaining -= meal.totalCalories;
      return remaining;
    }, this.calorieGoal)
  }

  toHtml() {
    return `<div class="col">
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
