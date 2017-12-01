const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";

function getAllMeals() {
  $.ajax({
    url: API + '/api/v1/meals',
    method: 'GET',
  }).done(function(data) {
    data.forEach(function(meal) {
      meal.foods.forEach(function(food) {
        $(`#${meal.name.toLowerCase()} #foods-header`).after('<tr><td>' + food.name + '</td><td>' + food.calories + '</td></tr>');
      })
    })
  })
};

module.exports = getAllMeals
