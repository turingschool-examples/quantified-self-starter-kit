require("../models/food.js")
require("../ajax-requests/all_foods.js")
const $ = require('jquery')

import { foodsResponse } from '../ajax-requests/all_foods.js';

foodsResponse.done(function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#list").append(`<li> Name: ${data[i].name} | Calories: ${data[i].calories} | delete_icon.png </li>`)
  }
});
