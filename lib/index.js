const $ = require('jQuery')
import { getAllFoods, deleteFood, postFood, editBox, editFood } from './services/foodService'

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
      editing = true;
      addEditListener(target);
    }
  });
  $('form input[value="submit"]').on('click', (event) => {
    event.preventDefault();
    postFood();
  });
});

function addEditButton(target) {
  let id = target.dataset.id;
  let deleteButton = $('td').find(`img[data-id="${id}"]`);
  $(`<button data-id="${id}">Edit</button>`).insertAfter(deleteButton);
}

function addEditListener(target) {
  addEditButton(target);
  let id = target.dataset.id;
  let attr = target.className.split("-")[1];
  let $button = $('button[data-id=' + id + ']');
  $($button).on('click', (event) => {
    event.stopPropagation;
    editFood(id, attr);
  });
}
