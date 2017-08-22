require ('./index.scss');
require('./style/food_index.scss');

const Food = require ('./models/Food.js')
const Meal = require ('./models/Meal.js')

// const foodOrderByCal  = ['original', 'asc', 'desc']

// let sortOrder         = foodOrderByCal[0]
let foodCollection    = []

$(document).ready( () => {
  require('./events/food-events');
  require('./events/meal-events');
});
