const $ = require('jquery')
const Food = require('../models/Food')
const Ajax = require('../ajax_requests/ajax')

$(document).ready(function(){
  $("#food_form").submit(function(event) {
    var name = $("input[name=name]").val()
    var calories = $("input[name=calories]").val()
    if (name.length === 0) {
      $("p#submit-food-name").append("Please enter a food name.")
      event.preventdefault();
    } else if (calories.length === 0) {
      $("p#submit-calories").append("Please enter a calorie amount.")
      event.preventdefault();
    } else {
      //$("tbody").prepend("<tr><td><span class='display'>" + name + "</span><input type='text' class='edit' style='display:none'/></td><td><span class='display'>" + calories + "</span><input type='text' class='edit' style='display:none'/></td></tr>")
      $('input').val('').removeAttr('checked').removeAttr('selected');
      Ajax.postFoods(name, calories)
      // var list = $('tbody').html();
      //localStorage.setItem('list', list);
    }
  })
})

//if(localStorage.getItem('list')) {
//$('tbody').html(localStorage.getItem('list'));
//}

