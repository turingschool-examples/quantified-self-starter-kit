require ('./index.scss');
require('./style/food_index.scss');

const food = require ('./models/Food.js');
const meal = require ('./models/Meal.js');

$(document).ready( () => {
  require('./events/food-events');
  require('./events/meal-events');
});
