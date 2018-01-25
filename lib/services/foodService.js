var $ = require('jQuery');
var Food = require('../models/food');
var API = "https://turing-quantified-self-api.herokuapp.com/api/v1/";

export { getAllFoods }

function getAllFoods() {
    fetch('https://turing-quantified-self-api.herokuapp.com/api/v1/foods')
    .then(response => response.json())
    .then(data => {
      data.forEach((food) => {
        $('table').append(`<tr><td>${food.name}</td><td>${food.calories}</td></tr>`);
        // $('#foods').append(`<td>${food.calories}</td>`);
      })
    })
}
