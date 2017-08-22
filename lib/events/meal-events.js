const Meal = require('../models/Meal'),
      MealTotals = require('../models/MealTotals'),
      MealsApi = require('../apis/meals-api'),
      $mealsCont = $('#meals .row'),
      mealTotals = new MealTotals();

let meals = [];

const addMealTotals = () => {
  $($mealsCont).append(mealTotals.toHtml());
}

const updateFooter = (meal_id, newFooter) => {
  $(`table[data-id="${meal_id}"] tfoot`)[0].remove();
  $(`table[data-id="${meal_id}"]`).append(newFooter);
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
        $(e.target).parent().parent().remove();
        updateFooter(meal_id, newFooter);
      });
}

const setAllChecks = (checked) => {
  $('#foods-table input:checkbox').each((i,item) => {
    $(item).prop('checked', checked);
  })
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
    let food = foodCollection.find((food) => { return food.id == food_ids[i] })
    
    meal.addFood(food)
      .then( (newHtml) => {
        $($mealTable).append(newHtml[0]);
        updateFooter(meal_id, newHtml[1]);
        setAllChecks(false);
      });
  }
}

const mealsHtml = () => {
  MealsApi.getMeals().then( (data) => {
    meals = data.map( (rawMeal) => {
      const meal = new Meal(rawMeal);
      $mealsCont.append(meal.mealTable());
      return meal;
    });
    mealTotals.meals = meals;
    addMealTotals();
    $('.meal-table').on('click', '.delete', removeFoodFromMeal);
  });
}

const checkAllFoods = (e) => {
  e.preventDefault();
  if ($(e.target).text() == "All") {
    $(e.target).text("None");
    setAllChecks(true);
  } else {
    $(e.target).text("All");
    setAllChecks(false);
  }
}

mealsHtml();
$('.select-meal .btn').on('click', addFoodstoMeal);
$('#select-all-foods').on('click', checkAllFoods);
