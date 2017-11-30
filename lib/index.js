require('./styles.scss')
require('./event_listeners/addFood.js')
const $ = require('jquery')
const meal_events = require('./event_listeners/meal-events')
$(document).ready(() => {
  meal_events;
});