const Meal = require('../models/Meal');
const MealTotals = require('../models/MealTotals');
const MealsApi = require('../apis/meals-api');

const fakeMeals = [{"id":1,"name":"Breakfast","foods":[{"id":3,"name":"Chicken Burrito","calories":800},{"id":4,"name":"Grapes","calories":180},{"id":10,"name":"Cheese","calories":400}]},{"id":2,"name":"Snack","foods":[{"id":5,"name":"Blueberry Muffins","calories":450},{"id":11,"name":"Fruit Snacks","calories":120},{"id":12,"name":"Apple","calories":220}]},{"id":3,"name":"Lunch","foods":[{"id":2,"name":"Bagel Bites - Four Cheese","calories":650},{"id":8,"name":"Granola Bar","calories":200},{"id":8,"name":"Granola Bar","calories":200}]},{"id":4,"name":"Dinner","foods":[{"id":4,"name":"Grapes","calories":180},{"id":11,"name":"Fruit Snacks","calories":120},{"id":12,"name":"Apple","calories":220}]}];

const $mealsCont = $('#meals .row');

let meals = [];
const mealTotals = new MealTotals();

const addMealTotals = () => {
  $mealsCont.append(mealTotals.toHtml());
}

const removeFoodFromMeal = (e) => {
  const meal_id = e.target.dataset.meal_id,
        meal = meals[meal_id - 1],
        food_id = e.target.dataset.food_id;
  e.preventDefault();
  meal.removeFood(food_id).
      then( (newFooter) => {
        $(`tr[data-food_id=${food_id}]`).remove();
        $(`table[data-id=${meal_id}] tfoot`)[0].remove();
        $(`table[data-id=${meal_id}]`).append(`${newFooter}`);
        $("#mealTotals").remove();
        addMealTotals();
      });
}

const mealsHtml = () => {
  MealsApi.getMeals().then( (data) => {
    meals = data.map( (rawMeal) => {
      meal = new Meal(rawMeal);
      $mealsCont.append(meal.mealTable());
      return meal;
    });
    mealTotals.meals = meals;
    addMealTotals();
    $('.meal-table').on('click', '.delete', removeFoodFromMeal);
  });
}

mealsHtml();
