const $ = require('jquery')

$(document).ready(function(){
  $("#food_form").submit(function(event) {
    var name = $("input[name=name]").val()
    var calories = $("input[name=calories]").val()
    if ((name.length === 0) || (calories.length === 0)) {
      alert("To add an item, please fill out both fields.")
    } else {
      $("tbody").prepend("<tr><td><span class='display'>" + name + "</span><input type='text' class='edit' style='display:none'/></td><td><span class='display'>" + calories + "</span><input type='text' class='edit' style='display:none'/></td></tr>")
      var list = $('tbody').html();
      localStorage.setItem('list', list);
      $('input').val('').removeAttr('checked').removeAttr('selected');
      event.preventDefault();
    }
  })
})

if(localStorage.getItem('list')) {
$('.food-body').html(localStorage.getItem('list'));
}
