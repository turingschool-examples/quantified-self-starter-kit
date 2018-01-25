const $ = require('jQuery');
const Food = require('../models/food');
const API = "https://turing-quantified-self-api.herokuapp.com/api/v1/";

export { getAllFoods, deleteFood, postFood }

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

function postFood() {
  let name = $('#new-food-name input').val();
  let calories = $('#new-food-calories input').val();
  if (name === "") {
    $('#new-food-form .alert').empty()
    $('#new-food-name').append('<p class="alert">Please enter a food name</p>');  
  } else if (calories === "") {
    $('#new-food-form .alert').empty()
    $('#new-food-calories').append('<p class="alert">Please enter a calorie amount</p>')
  } else {
    $('#new-food-form .alert').empty()
    sendPostRequest(name, calories);
  }
}
