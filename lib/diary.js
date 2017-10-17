$(document).ready(function(){
  createTableContents()
})

function addToMealTable(){
  $("li").on("click", function(){
    let mealId = $(this).children().attr("class")
    collectTableSelection(mealId)
    removeCheckedBoxes()
  })
}

function createTableContents(){
  $.get("http://localhost:3000/api/v1/meals")
    .then(function(meals){
      meals.forEach(function(meal, i) {
        var totalCalories = 0
        generateTable(meal)
        let mealName = meal.name
        meal.foods.forEach(function(food) {
          $(`table.${mealName} > tbody`).append("<tr><td>" + food.name + "</td><td class='total'>" + food.calories + "</td></tr>")
          totalCalories += food.calories
        })
        calorieCounter(mealName, i, totalCalories)
      })
      let caloriesConsumed = 0
      totalCalories(caloriesConsumed)
      hideDeleteButtons()
      addCheckboxes()
      addToMealTable()
    })
    .catch(function(error){
      console.error(error)
    })
}

function collectTableSelection(mealId){
  $.each($("#foodTable :checkbox:checked"), function(){
    $.post("http://localhost:3000/api/v1/meals/" + mealId + "/foods/" + ($(this).closest("tr").find("td:eq(3)").children().attr("id")), function(data){
    })
    var foodName = $(this).closest("td").next().text()
    var foodCalories = $(this).closest("td").next().next().text()
    $("#" + mealId + " table > tbody").append("<tr><td>" + foodName + "</td><td>" + foodCalories + "</td></tr>")
  })
}

function removeCheckedBoxes(){
  $("#foodTable input:checkbox").prop("checked", false)
}

function addCheckboxes(){
  $(".left2 > #foodTable > tbody").find(".list").prepend('<td><input type="checkbox"/></td>')
  $(".left2 > #foodTable > tbody").find("#headers").prepend('<span/>')
}

function hideDeleteButtons(){
  $(".left2 > #foodTable > tbody").find(".delete-row").hide()
}

function totalCalories(caloriesConsumed){
  $(".sum").each(function(){
    caloriesConsumed += parseFloat($(this).text())
  })
  $(".total-calories").append($totalsTable)
  $("tr#total-calories").append("<th>" + caloriesConsumed + "</th>")
  $("tr#total-goal").append("<td>" + (2000 - caloriesConsumed) + "</td>")
  $("tr#total-goal > td").addClass('green');
  $("tr#total-goal > td:contains('-')").addClass('red')
}

class Table{
  constructor(){
    this.tableBody = $('<table/>').append(
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
    )}
}

function generateTable(meal){
  let table = new Table()
  if (meal.id === 1) {
    $("div.left").append(table.tableBody.addClass(meal.name))
  }else if (meal.id === 2) {
    $("div.right").append(table.tableBody.addClass(meal.name))
  }else if (meal.id === 3) {
    $("div.left1").append(table.tableBody.addClass(meal.name))
  }else if (meal.id === 4) {
    $("div.right1").append(table.tableBody.addClass(meal.name))
  }
}

function calorieCounter(mealName, i, totalCalories){
  var goalCalories = [400, 200, 600, 800][i]
  $(`table.${mealName} > tfoot > tr#total`).append("<td class='sum'>" + totalCalories + "</td>")
  var remainingCalories = (goalCalories - totalCalories)
  $(`table.${mealName} > tfoot > tr#goal`).append("<td>" + remainingCalories + "</td>")
  $(`table.${mealName} > tfoot > tr#goal > td`).addClass('green');
  $(`table.${mealName} > tfoot > tr#goal > td:contains('-')`).addClass('red');
}

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
