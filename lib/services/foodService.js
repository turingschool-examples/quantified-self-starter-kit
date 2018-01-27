const $ = require('jQuery');
const Food = require('../models/food');
const API = "https://ml-quantified-self.herokuapp.com/api/v1/";

// export { getAllFoods, deleteFood, postFood }
module.exports = class FoodService {
  // constructor() {
  //
  // }

  static addFood(id, name, calories, bottom=true) {
    let newElement = `<tr class="food-${id}"><td>${name}</td><td>${calories}</td><td><img class="delete-food" data-id="${id}" src="./lib/assets/delete1.png"></td></tr>`
    if (bottom) {
      $('#foods-table').append(newElement);
    } else {
      $(newElement).insertAfter('#foods-table-headers');
    }
  }

  static getAllFoods() {
      fetch(API + 'foods')
      .then(response => response.json())
      .then(data => {
        data.forEach((food) => {
          this.addFood(food.id, food.name, food.calories);
        })
      })
  }

  static deleteFood(target) {
    let id = target.dataset.id;
    fetch(API + 'foods/' + id.toString(), { method: 'DELETE' })
      .then(data => {
        $(`.food-${id}`).remove();
      })
  }

  static postFood() {
    let name = $('#new-food-name input').val();
    let calories = $('#new-food-calories input').val();
    $('#new-food-form .alert').empty();
    $('#new-food-name input').val('');
    $('#new-food-calories input').val('');
    if (name === "" && calories === ""){
      $('#new-food-name').append('<p class="alert">Please enter a food name</p>');
      $('#new-food-calories').append('<p class="alert">Please enter a calorie amount</p>')
    } else if (name === "") {
      $('#new-food-name').append('<p class="alert">Please enter a food name</p>');
    } else if (calories === "") {
      $('#new-food-calories').append('<p class="alert">Please enter a calorie amount</p>')
    } else {
      this.sendPostRequest(name, calories.toString());
    }
  }

  static sendPostRequest(name, calories) {
    fetch(API + 'foods', {
      method: 'POST',
      headers:
      { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food: { name: name, calories: calories }})
    }).then(response => response.json())
    .then(data => this.addFood(data.id, data.name, data.calories, false))
  }
}




// function addFood(id, name, calories, bottom=true) {
//   let newElement = `<tr class="food-${id}"><td>${name}</td><td>${calories}</td><td><img class="delete-food" data-id="${id}" src="./lib/assets/delete1.png"></td></tr>`
//   if (bottom) {
//     $('#foods-table').append(newElement);
//   } else {
//     $(newElement).insertAfter('#foods-table-headers');
//   }
// }
//
// function getAllFoods() {
//     fetch(API + 'foods')
//     .then(response => response.json())
//     .then(data => {
//       data.forEach((food) => {
//         addFood(food.id, food.name, food.calories);
//       })
//     })
// }
//
// function deleteFood(target) {
//   let id = target.dataset.id;
//   fetch(API + 'foods/' + id.toString(), { method: 'DELETE' })
//     .then(data => {
//       $(`.food-${id}`).remove();
//     })
// }
//
// function postFood() {
//   let name = $('#new-food-name input').val();
//   let calories = $('#new-food-calories input').val();
//   $('#new-food-form .alert').empty();
//   $('#new-food-name input').val('');
//   $('#new-food-calories input').val('');
//   if (name === "") {
//     $('#new-food-name').append('<p class="alert">Please enter a food name</p>');
//   } else if (calories === "") {
//     $('#new-food-calories').append('<p class="alert">Please enter a calorie amount</p>')
//   } else {
//     sendPostRequest(name, calories.toString());
//   }
// }
//
// function sendPostRequest(name, calories) {
//   fetch(API + 'foods', {
//     method: 'POST',
//     headers:
//     { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ food: { name: name, calories: calories }})
//   }).then(response => response.json())
//   .then(data => addFood(data.id, data.name, data.calories, false))
// }
