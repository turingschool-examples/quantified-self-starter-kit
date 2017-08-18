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
}

module.exports = MealTotals
