$(document).ready(function(){
  $.get("https://hidden-shelf-49347.herokuapp.com/api/v1/meals")
    .then(function(foods){
      $("h2.left").append(foods[0].name)
      $("div.left").append($table.addClass("left"))
      foods[0].foods.map(function(element) {
        $("table.left > tbody").append("<tr><td>" + element.name + "</td><td>" + element.calories + "</td></tr>")
      })
    })
    .catch(function(error){
      console.error(error)
    })
  $.get("https://hidden-shelf-49347.herokuapp.com/api/v1/meals")
    .then(function(foods){
      $("h2.right").append(foods[1].name)
      $("div.right").append($table1.addClass("right"))
      foods[1].foods.map(function(element) {
        $("table.right > tbody").append("<tr><td>" + element.name + "</td><td>" + element.calories + "</td></tr>")
      })
    })
    .catch(function(error){
      console.error(error)
    })
  $.get("https://hidden-shelf-49347.herokuapp.com/api/v1/meals")
    .then(function(foods){
      $("h2.left1").append(foods[2].name)
      $("div.left1").append($table2.addClass("left"))
      foods[2].foods.map(function(element) {
        $("table.left > tbody").append("<tr><td>" + element.name + "</td><td>" + element.calories + "</td></tr>")
      })
    })
    .catch(function(error){
      console.error(error)
    })
  $.get("https://hidden-shelf-49347.herokuapp.com/api/v1/meals")
    .then(function(foods){
      $("h2.right1").append(foods[3].name)
      $("div.right1").append($table3.addClass("right"))
      foods[3].foods.map(function(element) {
        $("table.right > tbody").append("<tr><td>" + element.name + "</td><td>" + element.calories + "</td></tr>")
      })
    })
    .catch(function(error){
      console.error(error)
    })
})
var $table = $('<table/>').append(
  $("<thead/>").append(
    $("<tr/>").append(
      $("<th/>").text("Name"),
      $("<th/>").text("Calories"))),
  $("<tbody/>").append("<tr/>")
)
var $table1 = $('<table/>').append(
  $("<thead/>").append(
    $("<tr/>").append(
      $("<th/>").text("Name"),
      $("<th/>").text("Calories"))),
  $("<tbody/>").append("<tr/>")
)
var $table2 = $('<table/>').append(
  $("<thead/>").append(
    $("<tr/>").append(
      $("<th/>").text("Name"),
      $("<th/>").text("Calories"))),
  $("<tbody/>").append("<tr/>")
)
var $table3 = $('<table/>').append(
  $("<thead/>").append(
    $("<tr/>").append(
      $("<th/>").text("Name"),
      $("<th/>").text("Calories"))),
  $("<tbody/>").append("<tr/>")
)
