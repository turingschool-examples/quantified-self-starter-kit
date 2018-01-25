const $ = require('jQuery')
import { getAllFoods, deleteFood, postFood } from './services/foodService'

$(document).ready(() => {
  getAllFoods();
  $('#foods-table').on('click', (event) => {
    if (event.target.className == 'delete-food') {
      deleteFood(event.target);
    }
  });
  $('form input[value="submit"]').on('click', (event) => {
    event.preventDefault();
    postFood();
  });
});
