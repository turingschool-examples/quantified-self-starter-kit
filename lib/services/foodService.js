const $ = require('jQuery');
const Food = require('../models/food');
const API = "https://ml-quantified-self.herokuapp.com/api/v1/";

class FoodService {
  constructor() {
    this._editing = false;
  }

  get editing() {
    return this._editing
  }

  addInfo(id, name, calories, targetNode) {
    if (window.location.href === "http://localhost:8080/foods.html"){
      targetNode.prepend(`<td><img class="delete-food" data-id="${id}" src="./lib/assets/delete1.png"></td>`)
      targetNode.prepend(`<td class="food-calories" data-id="${id}">${calories}</td>`)
      targetNode.prepend(`<td class="food-name" data-id="${id}">${name}</td>`)
      this._editing = false;
    } else {
      targetNode.append(`<td><input type="checkbox" value="${id}"></td>`)
      targetNode.append(`<td class="food-name" data-id="${id}">${name}</td>`)
      targetNode.append(`<td class="food-calories" data-id="${id}">${calories}</td>`)
    }
  }

  addFood(id, name, calories, bottom=true) {
    let newRow = `<tr class="food-${id}"></tr>`
    if (bottom) {
      $(newRow).insertAfter($('#foods-table tbody'));
    } else {
      $(newRow).insertAfter('#foods-table-headers');
    }
      this.addInfo(id, name, calories, $(`.food-${id}`))
  }

  getAllFoods() {
      fetch(API + 'foods')
      .then(response => response.json())
      .then(data => {
        data.forEach((food) => {
          this.addFood(food.id, food.name, food.calories);
        })
      })
  }

  deleteFood(target) {
    let id = target.dataset.id;
    fetch(API + 'foods/' + id.toString(), { method: 'DELETE' })
      .then(data => {
        $(`.food-${id}`).remove();
      })
  }

  postFood() {
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

  sendPostRequest(name, calories) {
    fetch(API + 'foods', {
      method: 'POST',
      headers:
      { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food: { name: name, calories: calories }})
    }).then(response => response.json())
    .then(data => this.addFood(data.id, data.name, data.calories, false))
  }

  editBox(target) {
    if (window.location.href === "http://localhost:8080/foods.html"){
      if ((target.className === 'food-name' || 'food-calories') && !this._editing) {
        this._editing = true;
        let input = document.createElement('input');
        input.type = "text";
        input.className = "editBox";
        input.dataset.id = target.dataset.id;
        target.replaceWith(input);
        this.addEditListener(target)
      };
    }
  }

  addEditListener(target) {
    this.addEditButton(target);
    let id = target.dataset.id;
    let attr = target.className.split("-")[1];
    let $button = $('button[data-id=' + id + ']');
    $($button).on('click', (event) => {
      event.stopPropagation;
      this.editFood(id, attr);
    });
  }

  addEditButton(target) {
    let id = target.dataset.id;
    console.log(id)
    let deleteButton = $('td').find(`img[data-id="${id}"]`);
    $(`<button data-id="${id}">Edit</button>`).insertAfter(deleteButton);
  }

  editFood(id, attr) {
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
      this.addFood(data['id'], data['name'], data['calories']);
    })
  }

  displayWith(name) {
    let foods = $('.food-name')
    foods.each((ind, food) => {
      let $element = $(food)
      let $row = $(`tr.food-${food.dataset.id}`)
      let text = $element.text()
      let span = name.length
      if (text.toLowerCase().slice(0, span) != name.toLowerCase()) {
        $row.addClass("disabled")
      } else {
        $row.removeClass("disabled")
      }
    })
  }

}

module.exports = new FoodService
