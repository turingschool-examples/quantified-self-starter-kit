const assert = require('chai').assert;
const MealTotals = require('../../lib/models/MealTotals.js');

describe('meal', () => {
  context('when created', () => {
    it('it is a MealTotal', () => {
      const myMealTotals = new MealTotals()
      assert.instanceOf(myMealTotals, MealTotals);
    });

    it('it has a default Calorie Goal of 2000', () => {
      const myMealTotals = new MealTotals()
      assert.equal(myMealTotals.calorieGoal, 2000);
    });

    it('it can have a different Calorie Goal', () => {
      const myMealTotals = new MealTotals({goal: 1000})
      assert.equal(myMealTotals.calorieGoal, 1000);
    });
  });

  describe('.caloriesConsumed', () => {})
  describe('.remainingCalories', () => {})
});
