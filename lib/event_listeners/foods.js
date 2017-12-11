const $ = require('jquery')
import {createNewFood, updateFood, deleteFood} from '../ajax_requests/food'
import {filterFoods, handleError, sortByCaloriesDesc, sortByCaloriesAsc, sortByCaloriesOrig} from '../response-handlers/food-responses'

export function eventListenerFunction() {
  $('#search-foods').on('keyup', filterFoods);

  $('.new_food_form input[type="submit"]').on('click', function(event){
    event.preventDefault();
    createNewFood();
  });

  $('#new_food_table').on('click', '.food-name-cell, .calorie-cell', function(event) {
    $(event.currentTarget).attr('contenteditable','true');
  });

  $('#new_food_table').on('blur', '.food-name-cell, .calorie-cell', function(event) {
    if (event.currentTarget.contentEditable === 'true') {
    $(event.currentTarget).attr('contenteditable','false');
    updateFood(event);
    }
  });

  $('#new_food_table').on('click','.delete_row' ,function(event) {
    deleteFood(event);
  });

  $('#food-table').on('click','#calorie-cell' ,function(event) {
    if (event.currentTarget.dataset.sort === "default") {
      sortByCaloriesDesc(event);
      event.currentTarget.dataset.sort = "desc";
    }
    else if (event.currentTarget.dataset.sort === "desc") {
      sortByCaloriesAsc(event);
      event.currentTarget.dataset.sort = "asc";
    }
    else {
      sortByCaloriesOrig(event);
      event.currentTarget.dataset.sort = "default";
    }
  });
}

eventListenerFunction();
