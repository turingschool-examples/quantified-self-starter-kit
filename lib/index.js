const $ = require('jQuery')
import { getAllFoods, deleteFood, postFood, editBox } from './services/foodService'

$(document).ready(() => {
  let editing = false;
  getAllFoods();
  $('#foods-table').on('click', (event) => {
    event.stopPropagation();
    let target = event.target;
    if (target.className == 'delete-food') {
      deleteFood(target);
    } else if ((target.className == 'food-name' || 'food-calories') && !editing) {
      editBox(target);
      editing = true
    }
  });
  $('form input[value="submit"]').on('click', (event) => {
    event.preventDefault();
    postFood();
  });
});
