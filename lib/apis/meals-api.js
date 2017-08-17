const $ = require('jquery');
const baseUrl = 'https://qs-baochris-api.herokuapp.com/api/v1';

class MealsApi {}

MealsApi.getMeals = () => {
  return $.ajax(`${baseUrl}/meals`, {method: 'GET'})
}

module.exports = MealsApi;
