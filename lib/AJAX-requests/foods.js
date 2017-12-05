var $ = require('jquery')
var foodHandlers = require('../response-handlers/foods')
var url = 'https://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods'
var mealsUrl = 'https://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals'

var populateFoods = function () {
  $.getJSON(url)
  .then(foodHandlers.appendPosts)
  .catch(foodHandlers.errorLog)
}

var postFood = function (foodPost) {
  $.ajax({
    type: 'POST',
    url: url,
    data: foodPost,
    dataType: 'json',
    success: function (data) {
      $('.food-table').prepend(`<tr data-id="${data.id}"><td contenteditable="true">${data.name}</td><td contenteditable="true"><i class="delete-button fa fa-minus-circle" aria-hidden="true"></i>${data.calories}</td></tr>`)
      $("#new_food").trigger('reset');
      return false;
    },
    error: function(err) {
      console.log(err);
    }
  })
}

var deleteFood = function () {
  var target = $(event.target)
  var foodId = target.closest('tr').data('id')
  var mealIds = []
  $.when($.get(mealsUrl).then(function (data) {
    data.filter(function (meal) {
      meal.foods.forEach(function (food) {
        if (food.id === foodId) {
          mealIds.push(meal.id)
        }
      })
    })
    killFoods(foodId, mealIds, target)
  }))
}

function killFoods (foodId, mealIds, target) {
  mealIds.forEach(function (id) {
    $.ajax({
      url: `https://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals/${id}/foods/${foodId}`,
      type: 'DELETE',
      dataType: 'json'
    })
  })
  $.ajax({
    url: `https://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods/${foodId}`,
    type: 'DELETE',
    dataType: 'json'
  })
  .then(function (data) {
    target.closest('tr').remove()
  })
  .fail(function (error) {
    alert('food not deleted')
  })
}

var editFoodRequest = function editFoodRequest(inputData, foodId) {
  $.ajax({
    type: 'PATCH',
    url: 'http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods/'+foodId,
    data: inputData,
    success: function(data) {
      alert('Food updated successfully');
    },
    error: function(err) {
      alert('There was a problem with your request. Please try again.')
    }
  })
}


module.exports = {
  populateFoods,
  postFood,
  deleteFood,
  editFoodRequest
}
