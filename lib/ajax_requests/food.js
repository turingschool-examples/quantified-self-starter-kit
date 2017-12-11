const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";
import {renderNewFoodTable, addNewFood, handleError} from '../response-handlers/food-responses'

const getAllFoods = function() {
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  }).done(function(data) {
    renderNewFoodTable(data);
  }).fail(function() {
    handleError();
  })
};

export function createNewFood() {
  var foodName = $(".new_food_form input[name='food_name']").val();
  var calorieCount = $(".new_food_form input[name='calorie_count']").val();
  return $.ajax({
    url: API + '/api/v1/foods',
    method: 'POST',
    data: { food: {name: foodName, calories: calorieCount} }
  }).done(function(data) {
    addNewFood(data);
  }).fail(function(error) {
    handleError(error);
  })
};

export function updateFood(event) {
  var $parentNode = $(event.currentTarget.parentElement)
  var id = $parentNode.data().id
  var foodName = $parentNode.children(".food-name-cell")[0].textContent
  var calories = $parentNode.children(".calorie-cell")[0].textContent
  return $.ajax({
    url: API + '/api/v1/foods/' + id,
    method: 'PATCH',
    data: { food: { name: foodName, calories: calories} },
  }).done(function(data) {
  }).fail(function() {
    handleError();
  })
}

export function deleteFood(event) {
  var id = event.currentTarget.parentElement.dataset.id
  return $.ajax({
    url: API + '/api/v1/foods/' + id,
    method: 'DELETE',
  }).done(function(data) {
    event.currentTarget.parentElement.remove();
  }).fail(function(error) {
    handleError(error);
  })
}

getAllFoods()
