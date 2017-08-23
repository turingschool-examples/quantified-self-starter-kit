const $          = require('jquery');
const baseURL    = 'https://qs-baochris-api.herokuapp.com';
const HtmlHelper = require('../helpers/HtmlHelper');

class Food {
  constructor(attrs) {
    this.id       = attrs.id;
    this.name     = attrs.name;
    this.calories = attrs.calories;
  }

  update( ) {
    const data = { name: this.name, calories: `${this.calories}` };
    return $.ajax({
      type: "PATCH",
      url: baseURL + `/api/v1/foods/${this.id}`,
      data: { food: data }
    });
  };

  static getAllFood() {
    return $.ajax({
      type: "GET",
      url: baseURL + '/api/v1/foods'
    });
  };

  static addFood() {
    return this.post()
      .then(function(food) {
        let foodObj = new Food(food);
        return [HtmlHelper.foodRow(foodObj), foodObj];
      });
  };

  static post() {
    const foodName = $('input[name ="food-name"]').val();
    const foodCal  = $('input[name ="food-calories"]').val();
    const data     = { name: foodName, calories: foodCal};

    return $.post(baseURL + '/api/v1/foods', {
      food: data
    }, (data, status) => {
      console.log("food added" + "\nStatus: " + status);
    });
  };

  static delete(foodID) {
    return $.ajax({
      url: `${baseURL}/api/v1/foods/${foodID}`,
      type: 'DELETE'
    });
  };
};

module.exports = Food;
