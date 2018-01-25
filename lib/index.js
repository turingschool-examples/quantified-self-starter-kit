const $ = require('jQuery')
import { getAllFoods } from './services/foodService'

$(document).ready(() => {
  getAllFoods();
});
