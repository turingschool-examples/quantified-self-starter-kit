require("../models/food.js")
const $ = require('jquery')

import { foodsResponse } from '../ajax-requests/all_foods.js'

foodsResponse.then(function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#list").append(`<li> Name: ${data[i].name} | Calories: ${data[i].calories} | delete_icon.png </li>`)
  }
}).catch(function() {
  console.log("Error Loading Food Tracker")
})
