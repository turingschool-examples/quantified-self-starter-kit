const assert = require('chai').assert
const Meal = require('../../lib/models/Meal.js')
const Food = require('../../lib/models/Food.js');

describe('meal', () => {
  context('when created', () => {
    it('it is a meal', () => {
      const myMeal = new Meal({name: "Breakfast", foods: []})
      assert.instanceOf(myMeal, Meal);
    })

    it('it has a name', () => {
      const myMeal = new Meal({name: "Breakfast", foods: []})
      assert.equal(myMeal.name, "Breakfast")
    })

    it('it has foods', () => {
      const myMeal = new Meal({name: "Breakfast", foods: []})
      assert.deepEqual(myMeal.foods, [])
    })

    it('it has a remainingCalories', () => {
      const myMeal = new Meal({name: "Breakfast", foods: []})
      assert.equal(myMeal.remainingCalories, 400)
    })

    it('it has totalCalories', () => {
      const myMeal = new Meal({name: "Breakfast", foods: []})
      assert.equal(myMeal.totalCalories, 0)
    })
  });

  describe('.addFood()', () => {
    context('when food is added', () => {
      it('it can hold food', () => {
        const myMeal = new Meal({name: "Breakfast", foods: []});
        const myFood = new Food({name: "Test", calories: 100});

        assert.equal(myMeal.foods.length, 0);

        myMeal.addFood(myFood);

        assert.equal(myMeal.foods.length, 1);
      });

      it('it increases totalCalories', () => {
        const myMeal = new Meal({name: "Breakfast", foods: []});
        const myFood = new Food({name: "Test", calories: 100});

        assert.equal(myMeal.totalCalories, 0);

        myMeal.addFood(myFood);

        assert.equal(myMeal.totalCalories, myFood.calories);
      });

      it('it decreases remainingCalories', () => {
        const myMeal = new Meal({name: "Breakfast", foods: []});
        const myFood = new Food({name: "Test", calories: 100});

        assert.equal(myMeal.remainingCalories, 400);

        myMeal.addFood(myFood);

        assert.equal(myMeal.remainingCalories, 400 - myFood.calories);
      });
    });

    context('when food is removed', () => {
      it('it no longer lists that food', () => {
        const myMeal = new Meal({name: "Breakfast", foods: []});
        const myFood = new Food({name: "Test", calories: 100});
        myMeal.addFood(myFood);

        assert.equal(myMeal.foods.length, 1);

        myMeal.removeFood(myFood);

        assert.equal(myMeal.foods.length, 0);
      });

      it('it decreases totalCalories', () => {
        const myMeal = new Meal({name: "Breakfast", foods: []});
        const myFood = new Food({name: "Test", calories: 100});

        myMeal.addFood(myFood);

        assert.equal(myMeal.totalCalories, myFood.calories);

        myMeal.removeFood(myFood);

        assert.equal(myMeal.totalCalories, 0);
      });

      it('it increases remainingCalories', () => {
        const myMeal = new Meal({name: "Breakfast", foods: []});
        const myFood = new Food({name: "Test", calories: 100});
        myMeal.addFood(myFood);

        assert.equal(myMeal.remainingCalories, 400 - myFood.calories);

        myMeal.removeFood(myFood);

        assert.equal(myMeal.remainingCalories, 400);
      });
    });
  });
});
