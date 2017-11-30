var $ = require('jquery')
var ajaxPost = require('../AJAX-requests/foods')

var getValues = function() {
  $('#add_food').on("click", function(ev) {
    var foodPost = {
      food: {
        name: $("input[name='name']").val(),
        calories: $("input[name='calories']").val(),
      }
    };
    ev.preventDefault();
    ajaxPost.postFood(foodPost)
  })
}
module.exports = {
  getValues
}
