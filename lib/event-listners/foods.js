var $ = require('jquery')
var ajaxReq = require('../AJAX-requests/foods')

var getValues = function() {
  $('#add_food').on("click", function(ev) {
    var foodPost = {
      food: {
        name: $("input[name='name']").val(),
        calories: $("input[name='calories']").val(),
      }
    };
    ev.preventDefault();
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
module.exports = {
  getValues,
  deleteListener
}
