require ('./index.scss');
require('./style/food_index.scss');

const Food = require ('./models/Food.js')
const Meal = require ('./models/Meal.js')
let foodCollection = []

$(document).ready( () => {
  require('./events/food-events');
  require('./events/meal-events');
});
