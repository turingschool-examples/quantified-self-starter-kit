require ('./index.scss');
require('./style/food_index.scss');

let foodCollection = [];

const Food = require ('./models/Food.js');
const Meal = require ('./models/Meal.js');
const HtmlHelper = require('./helpers/HtmlHelper');

$(document).ready( () => {
  require('./events/food-events');
  require('./events/meal-events');
});
