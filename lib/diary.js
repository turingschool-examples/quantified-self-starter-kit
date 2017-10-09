$(document).ready(function(){
  var totalBreakfast = 0
  $.get("https://hidden-shelf-49347.herokuapp.com/api/v1/meals")
    .then(function(foods){
      $("h2.left").append(foods[0].name)
      $("div.left").append($table.addClass("left"))
      var goalBreakfast = 400
      foods[0].foods.forEach(function(element) {
        $("table.left > tbody").append("<tr><td>" + element.name + "</td><td class='total'>" + element.calories + "</td></tr>")
        totalBreakfast += element.calories
      })
      $("table.left > tfoot > tr#total").append("<td class='sum'>" + totalBreakfast + "</td>")
      var breakfastCalories = (goalBreakfast - totalBreakfast)
      $("table.left > tfoot > tr#goal").append("<td>" + breakfastCalories + "</td>")
      $("table.left > tfoot > tr#goal > td").addClass('green');
      $("table.left > tfoot > tr#goal > td:contains('-')").addClass('red');
    })
    .catch(function(error){
      console.error(error)
    })
  var totalSnack = 0
  $.get("https://hidden-shelf-49347.herokuapp.com/api/v1/meals")
    .then(function(foods){
      $("h2.right").append(foods[1].name)
      $("div.right").append($table1.addClass("right"))
      var goalSnack = 200
      foods[1].foods.forEach(function(element) {
        $("table.right > tbody").append("<tr><td>" + element.name + "</td><td>" + element.calories + "</td></tr>")
        totalSnack += element.calories
      })
      $("table.right > tfoot > tr#total").append("<td class='sum'>" + totalSnack + "</td>")
      var snackCalories = (goalSnack - totalSnack)
      $("table.right > tfoot > tr#goal").append("<td>" + snackCalories + "</td>")
      $("table.right > tfoot > tr#goal > td").addClass('green');
      $("table.right > tfoot > tr#goal > td:contains('-')").addClass('red');
    })
    .catch(function(error){
      console.error(error)
    })
  var totalLunch = 0
  $.get("https://hidden-shelf-49347.herokuapp.com/api/v1/meals")
    .then(function(foods){
      $("h2.left1").append(foods[2].name)
      $("div.left1").append($table2.addClass("left1"))
      var goalLunch = 600
      foods[2].foods.forEach(function(element) {
        $("table.left1 > tbody").append("<tr><td>" + element.name + "</td><td>" + element.calories + "</td></tr>")
        totalLunch += element.calories
      })
      $("table.left1 > tfoot > tr#total").append("<td class='sum'>" + totalLunch + "</td>")
      var lunchCalories = (goalLunch - totalLunch)
      $("table.left1 > tfoot > tr#goal").append("<td>" + lunchCalories + "</td>")
      $("table.left1 > tfoot > tr#goal > td").addClass('green');
      $("table.left1 > tfoot > tr#goal > td:contains('-')").addClass('red');
    })
    .catch(function(error){
      console.error(error)
    })
  var totalDinner = 0
  $.get("https://hidden-shelf-49347.herokuapp.com/api/v1/meals")
    .then(function(foods){
      $("h2.right1").append(foods[3].name)
      $("div.right1").append($table3.addClass("right1"))
      var goalDinner = 800
      foods[3].foods.forEach(function(element) {
        $("table.right1 > tbody").append("<tr><td>" + element.name + "</td><td>" + element.calories + "</td></tr>")
        totalDinner += element.calories
      })
      $("table.right1 > tfoot > tr#total").append("<td class='sum'>" + totalDinner + "</td>")
      var dinnerCalories = (goalDinner - totalDinner)
      $("table.right1 > tfoot > tr#goal").append("<td>" + dinnerCalories + "</td>")
      $("table.right1 > tfoot > tr#goal > td").addClass('green');
      $("table.right1 > tfoot > tr#goal > td:contains('-')").addClass('red');
      $(".sum").each(function(){
        caloriesConsumed += parseFloat($(this).text())
      })
      $(".total-calories").append($totalsTable)
      $("tr#total-calories").append("<th>" + caloriesConsumed + "</th>")
      $("tr#total-goal").append("<td>" + (2000 - caloriesConsumed) + "</td>")
      $("tr#total-goal > td").addClass('green');
      $("tr#total-goal > td:contains('-')").addClass('red');
    })
    .catch(function(error){
      console.error(error)
    })
  var caloriesConsumed = 0
})


var $table = $('<table/>').append(
  $("<thead/>").append(
    $("<tr/>").append(
      $("<th/>").text("Name"),
      $("<th/>").text("Calories"))),
  $("<tbody/>").append("<tr/>"),
  $("<tfoot/>").append(
    $("<tr/>", {
      id: "total"
    }).append(
      $("<th/>").text("Total Calories:")),
    $("<tr/>", {
      id: "goal"
    }).append(
      $("<th/>").text("Remaining Calories:")))
)
var $table1 = $('<table/>').append(
  $("<thead/>").append(
    $("<tr/>").append(
      $("<th/>").text("Name"),
      $("<th/>").text("Calories"))),
  $("<tbody/>").append("<tr/>"),
  $("<tfoot/>").append(
    $("<tr/>", {
      id: "total"
    }).append(
      $("<th/>").text("Total Calories:")),
    $("<tr/>", {
      id: "goal"
    }).append(
      $("<th/>").text("Remaining Calories:")))

)
var $table2 = $('<table/>').append(
  $("<thead/>").append(
    $("<tr/>").append(
      $("<th/>").text("Name"),
      $("<th/>").text("Calories"))),
  $("<tbody/>").append("<tr/>"),
  $("<tfoot/>").append(
    $("<tr/>", {
      id: "total"
    }).append(
      $("<th/>").text("Total Calories:")),
    $("<tr/>", {
        id: "goal"
      }).append(
      $("<th/>").text("Remaining Calories:")))
)
var $table3 = $('<table/>').append(
  $("<thead/>").append(
    $("<tr/>").append(
      $("<th/>").text("Name"),
      $("<th/>").text("Calories"))),
  $("<tbody/>").append("<tr/>"),
  $("<tfoot/>").append(
    $("<tr/>", {
        id: "total"
      }).append(
      $("<th/>").text("Total Calories:")),
    $("<tr/>", {
        id: "goal"
      }).append(
      $("<th/>").text("Remaining Calories:")))
)
var $totalsTable = $('<table/>').append(
  $("<tfoot/>").append(
    $("<tr/>", {
      id: "total"
    }).append(
      $("<th/>").text("Goal Calories"),
      $("<th/>").text(2000)),
    $("<tr/>", {
      id: "total-calories"
    }).append(
      $("<th/>").text("Calories Consumed")),
    $("<tr/>", {
      id: "total-goal"
    }).append(
      $("<th/>").text("Remaining Calories")))
)
