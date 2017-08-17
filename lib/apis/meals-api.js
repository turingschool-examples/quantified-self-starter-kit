const $ = require('jQuery');
const baseUrl = 'https://qs-baochris-api.herokuapp.com/api/v1';

class MealsApi {}

MealsApi.getMeals = () => {
  return $.get(`${baseUrl}/meals`)
}

module.exports = MealsApi;
