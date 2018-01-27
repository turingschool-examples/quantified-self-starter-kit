const $ = require('jQuery');
const Food = require('../models/food');
const API = 'https://ml-quantified-self.herokuapp.com/api/v1/'

export { getAllFoods, deleteFood, postFood, editBox, editFood }

function addInfo(id, name, calories, targetNode) {
  targetNode.append(`<td class="food-name" data-id="${id}">${name}</td>`)
  targetNode.append(`<td class="food-calories" data-id="${id}">${calories}</td>`)
  targetNode.append(`<td><img class="delete-food" data-id="${id}" src="./lib/assets/delete1.png"></td>`)
}

function addFood(id, name, calories, bottom=true) {
  let newRow = `<tr class="food-${id}"></tr>`
  if (bottom) {
    $('#foods-table').append(newRow);
  } else {
    $(newElement).insertAfter('#foods-table-headers');
  }
  addInfo(id, name, calories, $(`.food-${id}`))
}

function getAllFoods() {
    fetch(API + 'foods')
    .then(response => response.json())
    .then(data => {
      data.forEach((food) => {
        addFood(food.id, food.name, food.calories);
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
  $('#new-food-form .alert').empty();
  $('#new-food-name input').val('');
  $('#new-food-calories input').val('');
  if (name === "") {
    $('#new-food-name').append('<p class="alert">Please enter a food name</p>');  
  } else if (calories === "") {
    $('#new-food-calories').append('<p class="alert">Please enter a calorie amount</p>')
  } else {
    sendPostRequest(name, calories.toString());
  }
}

function sendPostRequest(name, calories) {
  fetch(API + 'foods', {
    method: 'POST',
    headers:
    { 'Content-Type': 'application/json' },
    body: JSON.stringify({ food: { name: name, calories: calories }})
  }).then(response => response.json())
  .then(data => addFood(data.id, data.name, data.calories, false))
}

function editBox(target) {
  let input = document.createElement('input');
  input.type = "text";
  input.className = "editBox";
  input.dataset.id = target.dataset.id;
  target.replaceWith(input);
}

function editFood(id, attr) {
  let $inputBox = $(`input[data-id=${id}]`);
  let body = { food: {}};
  body['food'][attr] = $inputBox.val();
  fetch(API + 'foods/' + id.toString(), {
      method: 'PATCH',
      headers:
      { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  }).then(response => response.json())
  .then(data => {
    $(`tr[class="food-${data['id']}"]`).remove();
    addFood(data['id'], data['name'], data['calories']);
  })
}
