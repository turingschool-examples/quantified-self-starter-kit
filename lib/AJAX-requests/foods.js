var $ = require('jquery')
var foodHandlers = require('../response-handlers/foods')

var url = 'http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods';

var populateFoods = function() {
  $.getJSON(url)
  .then(foodHandlers.appendPosts)
  .catch(foodHandlers.errorLog)
}

var postFood = function(foodPost) {
  $.ajax({
    type: 'POST',
    url: url,
    data: foodPost,
    dataType: 'json',
    success: function(data) {
      $('.food-table').prepend(`<tr><td>${data.name}</td><td>${data.calories}</td><td>delete</td></tr>`);
      $("#new_food").trigger('reset');
      return false;
    },
    error: function(err) {
      console.log(err);
    }
  })
}

module.exports = {
  populateFoods,
  postFood
}
