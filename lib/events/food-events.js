const Food             = require('../models/Food');
const view           = require('./helpers/food-helper');

const $submit          = $('#add-food');
const $foodFilter      = $('input[name="food-filter"]');
const $foodTable       = $('#foods-table');
const $createFood      = $('#create-food-btn');
const $calorieHeader   = $('.calories-header');

Food.getAllFood()
  .then((foods) => {
    foodCollection = foods.map((food) => {
      return new Food(food);
    }).sort((a,b) => {
      return b.id - a.id;
    });
    view.refreshTable(foodCollection);
  });

$submit.on('click', (event) => {
  if (view.validateInputs() === true) {
    Food.addFood()
      .then((food) => {
        foodCollection.push(food[1]);
        view.clearInputs();
        view.resetDescriptions();
        $('#foods-table > tbody > tr').eq(0).after(food[0]);
      });
  };
});

$foodFilter.on('keyup', (event) => {
  let filter = $foodFilter.val().toLowerCase();
  let filteredFoods = foodCollection.filter((food) => {
    return food.name.toLowerCase().includes(filter);
  }).sort((a,b) => {
    return b.id - a.id;
  });
  view.refreshTable(filteredFoods);
});

$foodTable.on('click', '.delete-food', function(event) {
  const itemID = parseInt(this.dataset.id);
  foodCollection = foodCollection.filter((food) => {
    return food.id !== itemID;
  });
  view.refreshTable(foodCollection);

  Food.delete(itemID);
});

$foodTable.on('click', '.food-name', (event) => {
  view.changeToInput(event, 'name')
});

$foodTable.on('click', '.food-calories', (event) => {
  view.changeToInput(event, 'calories')
});

$foodTable.on('mouseout', '.edit-name', (event) => {
  view.acceptEdits(event, 'name');
});

$foodTable.on('mouseout', '.edit-calories', (event) => {
  view.acceptEdits(event, 'calories');
});

$createFood.on('click', (event) => {
  window.location.href = "/foods.html";
});

$calorieHeader.on('click', view.changeFoodOrderByCalories)
