const $ = require('jquery')
const Food = require('../models/Food')
const Ajax = require('../ajax_requests/ajax')

$(document).ready(function(){
  $("#food_form").submit(function(event) {
    var name = $("input[name=name]").val()
    var calories = $("input[name=calories]").val()
    console.log('hi');
    if (name.length === 0) {
      event.preventDefault();
      $("p#submit-food-name").append("Please enter a food name.")
      var k = $('p#submit-food-name').html();
    } else if (calories.length === 0) {
      event.preventDefault();
      $("p#submit-calories").append("Please enter a calorie amount.")
    } else {
      $("p#submit-food-name").remove()
      $("p#submit-calories").remove()
      Ajax.postFoods(name, calories)
      $('input').val('').removeAttr('checked').removeAttr('selected');
    }
  })
})

