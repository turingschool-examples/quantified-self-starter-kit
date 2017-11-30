require('./styles.scss')
require('./event_listeners/addFood.js')
require('./event_listeners/editFood.js')
require('./event_listeners/listAllFoods.js')
const $ = require('jquery')
const meal_events = require('./event_listeners/meal-events')
$(document).ready(() => {
  meal_events;
});
