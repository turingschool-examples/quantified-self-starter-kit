const $ = require('jquery')
const Food = require('../models/Food')
const Ajax = require('../ajax_requests/ajax')

$(document).ready(function(){
  $("#food_form").submit(function(event) {
    var name = $("input[name=name]").val()
    var calories = $("input[name=calories]").val()
    sessionStorage.clear();
    if (name.length === 0) {
      $("p#submit-food-name").append("Please enter a food name.")
      var k = $('p#submit-food-name').html();
      sessionStorage.setItem('k', k);
    } else if (calories.length === 0) {
      $("p#submit-calories").append("Please enter a calorie amount.")
      var l = $('p#submit-calories').html();
      sessionStorage.setItem('l', l);
    } else {
      //$("tbody").prepend("<tr><td><span class='display'>" + name + "</span><input type='text' class='edit' style='display:none'/></td><td><span class='display'>" + calories + "</span><input type='text' class='edit' style='display:none'/></td></tr>")
      Ajax.postFoods(name, calories)
      $('input').val('').removeAttr('checked').removeAttr('selected');
      // var list = $('tbody').html();
      //localStorage.setItem('list', list);
    }
  })
})

if(sessionStorage.getItem('k')) {
$('p#submit-food-name').html(sessionStorage.getItem('k'));
}

if(sessionStorage.getItem('l')) {
$('p#submit-calories').html(sessionStorage.getItem('l'));
}

