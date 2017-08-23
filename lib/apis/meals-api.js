const $ = require('jquery');
const baseUrl = 'https://qs-baochris-api.herokuapp.com/api/v1';

class MealsApi {
  static getMeals() {
    return $.ajax(`${baseUrl}/meals`, {method: 'GET'})
  }

  static addFood(meal_id, food_id) {
    return $.ajax(`${baseUrl}/meals/${meal_id}/foods/${food_id}`, {method: 'POST'})
  }

  static removeFood(meal_id, food_id) {
    return $.ajax(`${baseUrl}/meals/${meal_id}/foods/${food_id}`, {method: 'DELETE'})
  }
}

module.exports = MealsApi;
