const $ = require('jquery')
import {sortByCaloriesDesc, sortByCaloriesAsc, sortByCaloriesOrig} from '../response-handlers/meal-responses'

export function eventMealListenerFunction() {
  $('#foods-table').on('click','#calorie-cell' ,function(event) {
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

eventMealListenerFunction()
