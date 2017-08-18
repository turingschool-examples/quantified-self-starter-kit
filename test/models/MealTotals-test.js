const assert = require('chai').assert;
const Meal = require('../../lib/models/Meal.js')
const Food = require('../../lib/models/Food.js');
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

  describe('.caloriesConsumed', () => {
    context('when there are no calories in meals', () => {
      it('it returns 0', () => {
        const myMealTotals = new MealTotals();

        assert.equal(myMealTotals.caloriesConsumed(), 0);
      })
    })
    context('when a meal has calories', () => {
      it('it returns the sum', () => {
        const myBFood = new Food( {name: "Test", calories: 100} );
        const myBMeal = new Meal( {name: "Breakfast", foods: [myBFood]} );
        const myLFood = new Food( {name: "Test", calories: 200} );
        const myLMeal = new Meal( {name: "Lunch", foods: [myLFood]} );
        const myMealTotals = new MealTotals( {meals: [myBMeal, myLMeal]} );

        assert.equal(myMealTotals.caloriesConsumed(), 300);
      })
    })
  })
  describe('.remainingCalories', () => {
    context('when there are no calories in meals', () => {
      it('it returns 2000', () => {
        const myMealTotals = new MealTotals();

        assert.equal(myMealTotals.remainingCalories(), 2000);
      })
    })
    context('when a meal has calories', () => {
      it('it returns the sum', () => {
        const myBFood = new Food( {name: "Test", calories: 100} );
        const myBMeal = new Meal( {name: "Breakfast", foods: [myBFood]} );
        const myLFood = new Food( {name: "Test", calories: 200} );
        const myLMeal = new Meal( {name: "Lunch", foods: [myLFood]} );
        const myMealTotals = new MealTotals( {meals: [myBMeal, myLMeal]} );

        assert.equal(myMealTotals.remainingCalories(), 1700);
      })
    })
  })
});
