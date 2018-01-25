const $ = require('jQuery');
const Food = require('../models/food');
const API = "https://turing-quantified-self-api.herokuapp.com/api/v1/";

export { getAllFoods, deleteFood }

function getAllFoods() {
    fetch(API + 'foods')
    .then(response => response.json())
    .then(data => {
      data.forEach((food) => {
        $('table').append(`<tr class="food-${food.id}"><td>${food.name}</td><td>${food.calories}</td><td><img class="delete-food" data-id="${food.id}" src="./lib/assets/delete1.png"></td></tr>`);
      })
    })
}

function deleteFood(target) {
  let id = target.dataset.id;
  fetch(API + 'foods/' + id.toString(), { method: 'DELETE' })
    .then(data => {
      $(`.food-${id}`).remove(); 
    })
}
