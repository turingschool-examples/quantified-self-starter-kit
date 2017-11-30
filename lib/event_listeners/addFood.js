const $ = require('jquery')

$(document).ready(function(){
  $("#food_form").submit(function(event) {
    var name = $("input[name=name]").val()
    var calories = $("input[name=calories]").val()
    if ((name.length === 0) || (calories.length === 0)) {
      alert("To add an item, please fill out both fields.")
    } else {
      $("table").append("<tr><td>" + name + "</td><td>" + calories + "</td></tr>")
      event.preventDefault();
    }
  })
})
