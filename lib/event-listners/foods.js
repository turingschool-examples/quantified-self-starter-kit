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

    if (foodPost.food.name.length < 1) {
      $(".name-error").show();
    } else {
        $(".name-error").hide();
    }

    if (foodPost.food.calories.length < 1) {
      $(".calorie-error").show();
    } else {
        $(".calorie-error").hide();
    }

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


module.exports = {
  getValues,
  deleteListener,
  searchListeners
}
