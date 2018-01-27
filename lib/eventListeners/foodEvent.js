const $ = require('jQuery')
const FoodService = require('../services/foodService')

$(document).ready(() => {
  FoodService.getAllFoods();


  $('#foods-table').on('click', (event) => {
    if (event.target.className == 'delete-food') {
      FoodService.deleteFood(event.target);
    }
  });

  $('form input[value="submit"]').on('click', (event) => {
    event.preventDefault();
    FoodService.postFood();
  });
});
