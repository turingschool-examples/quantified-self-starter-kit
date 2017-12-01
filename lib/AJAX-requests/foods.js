var $ = require('jquery')
var foodHandlers = require('../response-handlers/foods')
var url = 'http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods'
var mealsUrl = 'http://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals'

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
      $('.food-table').prepend(`<tr><td>${data.name}</td><td>${data.calories}</td><td>delete</td></tr>`)
      return false
    },
    error: function (err) {
      console.log(err)
      alert('There was an error')
    }
  })
}

var deleteFood = function deleteFood1 () {
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
      url: `http://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals/${id}/foods/${foodId}`,
      type: 'DELETE',
      dataType: 'json'
    })
  })
  $.ajax({
    url: `http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods/${foodId}`,
    type: 'DELETE',
    dataType: 'json'
  })
  .then(function (data) {
    target.closest('tr').remove()
    return data
  })
  .fail(function (error) {
    alert('food not deleted')
  })
}

module.exports = {
  populateFoods,
  postFood,
  deleteFood
}
