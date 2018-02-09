const $ = require('jQuery')
const FoodService = require('../services/foodService')

$(document).ready(() => {
  FoodService.getAllFoods('#foods-table');

  $('form input[value="submit"]').on('click', (event) => {
    event.preventDefault();
    FoodService.postFood();
  });

  $('#foods-table').on('click', (event) => {
     event.stopPropagation();
    if (event.target.className == 'delete-food') {
      FoodService.deleteFood(event.target);
    } else if (event.target.className.length > 0){
      FoodService.editBox(event.target);
    }
  });

  $('#filter-food-form').on('keyup', (event) => {
    FoodService.displayWith($(event.target).val())
  });

});
