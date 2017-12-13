var $ = require('jquery')
var foodHandlers = require('../response-handlers/foods')
var url = 'https://y-a-quantified-self-be.herokuapp.com/api/v1/foods'
var mealsUrl = 'https://y-a-quantified-self-be.herokuapp.com/api/v1/meals'

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
      $('.food-table').prepend(`<tr data-id="${data.id}"><td contenteditable="true">${data.name}</td><td contenteditable="true">${data.calories}</td><td class="delete-cell"><i class="delete-button fa fa-minus-circle" aria-hidden="true"></i></td></tr>`)
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
  $.get(mealsUrl).then(function (data) {
    data.filter(function (meal) {
      meal.foods.forEach(function (food) {
        if (food.id === foodId) {
          mealIds.push(meal.id)
        }
      })
    })
  }).then(function () {
    deleteFoodsCallDelegator(foodId, mealIds, target)
  })
}

function deleteFoodsFromMeals (foodId, mealIds) {
  return mealIds.map(function (id) {
    $.ajax({
      url: `https://y-a-quantified-self-be.herokuapp.com/api/v1/meals/${id}/foods/${foodId}`,
      type: 'DELETE',
      dataType: 'json'
    })
  })
}

function deleteFoodFromDB (foodId) {
  return $.ajax({
    url: `https://y-a-quantified-self-be.herokuapp.com/api/v1/foods/${foodId}`,
    type: 'DELETE',
    dataType: 'json'
  })
}

function deleteFoodsCallDelegator (foodId, mealIds, target) {
  var mealPromises = deleteFoodsFromMeals(foodId, mealIds);
  Promise.all(mealPromises)
  .then(function () {
    deleteFoodFromDB(foodId)
  })
  .then(function (data) {
    target.closest('tr').remove()
  })
  .catch(function (error) {
    alert('food not deleted')
  })
}


var editFoodRequest = function editFoodRequest(inputData, foodId) {
  $.ajax({
    type: 'PATCH',
    url: 'http://y-a-quantified-self-be.herokuapp.com/api/v1/foods/'+foodId,
    data: inputData,
    success: function(data) {
      alert('Food updated successfully')
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
