const Meal = require('../models/Meal'),
      MealTotals = require('../models/MealTotals'),
      MealsApi = require('../apis/meals-api'),
      $mealsCont = $('#meals .row'),
      mealTotals = new MealTotals();

let meals = [];

const addMealTotals = () => {
  $mealsCont.append(mealTotals.toHtml());
}

const updateFooter = (meal_id, newFooter) => {
  $(`table[data-id=${meal_id}] tfoot`)[0].remove();
  $(`table[data-id=${meal_id}]`).append(`${newFooter}`);
  $("#mealTotals").remove();
  addMealTotals();
}

const removeFoodFromMeal = (e) => {
  const meal_id = e.target.dataset.meal_id,
        meal = meals[meal_id - 1],
        food_id = e.target.dataset.food_id;
  e.preventDefault();
  meal.removeFood(food_id).
      then( (newFooter) => {
        $(`tr[data-food_id=${food_id}]`).remove();
        updateFooter(newFooter);
      });
}

const addFoodstoMeal = (e) => {
  e.preventDefault();
  const $mealTable = $(`table[data-name="${e.target.innerText}"]`)[0],
        meal_id = $mealTable.dataset.id,
        meal = meals[meal_id - 1];

  const food_ids = $('#foods-table input:checkbox:checked').map( function(){
    return $(this).val();
  });

  for(let i = 0; i < food_ids.length; i++) {
    let food = foodCollection.filter( (food) => {
      return food.id == food_ids[i];
    })[0];

    meal.addFood(food)
      .then( (newHtml) => {
        $($mealTable).append(newHtml[0]);
        updateFooter(newHtml[1]);
      });
  }

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
$('.select-meal .btn').on('click', addFoodstoMeal);
