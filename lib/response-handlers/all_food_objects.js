require("../models/food.js")

import { foodsJson } from '../ajax-requests/all_foods.js';

function useReturnData(foodsJson){
  for (var i = 0; i < foodsJson.length; i++) {
    $("#list").append(`<li> Name: ${foodsJson[i].name} | Calories: ${foodsJson[i].calories} | delete_icon.png </li>`)
  }
};

useReturnData(foodsJson);
