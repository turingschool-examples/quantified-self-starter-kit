var Food = require('./models/food');
var Meal = require('./models/meal');

var someFood = new Food();
var someMeal = new Meal();

const ajaxForFoods = require('./ajax_requests/food');
const foodEventListeners = require('./event_listeners/foods')
const mealDiary = require('./ajax_requests/meal');
const mealResponse = require('./response-handlers/meal-responses');
