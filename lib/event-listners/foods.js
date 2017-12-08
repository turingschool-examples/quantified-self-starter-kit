var $ = require('jquery')
var ajaxReq = require('../AJAX-requests/foods')
var response = require('../response-handlers/foods')

var getValues = function() {
  $('#add_food').on("click", function(ev) {
    var foodPost = {
      food: {
        name: $("input[name='name']").val(),
        calories: $("input[name='calories']").val(),
      }
    };
  ev.preventDefault()

  var nameError = $(".name-error"), calorieError = $(".calorie-error");

  (foodPost.food.name.length < 1) ? nameError.show() : nameError.hide();
  (foodPost.food.calories.length < 1) ? calorieError.show() : calorieError.hide();

  ajaxReq.postFood(foodPost)
  })
}


var deleteListener = function() {
  $('table').on('click', function() {
    if($(event.target).hasClass("delete-button")) {
    ajaxReq.deleteFood()
  }
  })
}

var searchListeners = function() {
  $("#search").keyup(function() {
    response.searchTable($(this).val());
  });
}

var foodEditListeners = function foodEditListeners() {
  $('.food-table').on('keydown', '.food', function(event) {
    var foodRow     = $(this).parent(),
    foodId          = foodRow.attr("data-id"),
    attributeName   = $(this).attr("name"),
    inputData       = { food: { [attributeName]: $(this).text() } };

    if (event.keyCode === 13) {
      ajaxReq.editFoodRequest(inputData, foodId)
      return false
    }
  })
}


module.exports = {
  getValues,
  deleteListener,
  searchListeners,
  foodEditListeners
}
