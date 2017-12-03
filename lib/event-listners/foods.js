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

    var foodName = $(this).val();
    var calorieCount = $(this).val();

    function msg(body) {
      $(".name-error").text(body).show();
    };

    function hide() {
      $(".name-error").hide();
    };

    if (foodName.length < 1) {
      $(".name-error").text('Please enter a food name').show();
    } else {
      hide();
    }

    function msg(body) {
      $(".calories-error").text(body).show();
    };

    function hide() {
      $(".calories-error").hide();
    };

    if (calorieCount.length < 1) {
      msg('Please enter a calorie count');
    } else {
      hide();

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
