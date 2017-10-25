let herokuURL = "https://quantified-self-node.herokuapp.com"

$(document).ready(function(){
  createTableContents()
})

function createTableContents(){
  $.get(`${herokuURL}/api/v1/meals`)
    .then(function(meals){
      meals.forEach(function(meal, i) {
        generateTable(meal)
        let mealName = meal.name
        let mealId = meal.id
        meal.foods.forEach(function(food) {
          $(`table.${mealName} > tbody`).append(`<tr><td class=food-name id=${food.id}>`
            + food.name + "</td><td class='total'>" + food.calories + "</td></tr>")
        })
        let totalReturnedMealCalories = calculateTotalMealCalories(mealName)
        calorieCounter(mealName, i, totalReturnedMealCalories)
      })
      totalCalories()
      hideDeleteButtons()
      addCheckboxes()
      addToMealTable()
      addDeleteButtons()
      deleteClickedRows()
    })
    .catch(function(error){
      console.error(error)
    })
}

function updateTableContents(){
  $.get(`${herokuURL}/api/v1/meals`)
    .then(function(meals){
      meals.forEach(function(meal, i) {
        generateTable(meal)
        let mealName = meal.name
        let mealId = meal.id
        meal.foods.forEach(function(food) {
          $(`table.${mealName} > tbody`).append(`<tr><td class=food-name id=${food.id}>`
            + food.name + "</td><td class='total'>" + food.calories + "</td></tr>")
        })
        let totalReturnedMealCalories = calculateTotalMealCalories(mealName)
        calorieCounter(mealName, i, totalReturnedMealCalories)
      })
      totalCalories()
      hideDeleteButtons()
      addCheckboxes()
      addDeleteButtons()
      deleteClickedRows()
    })
    .catch(function(error){
      console.error(error)
    })
}

function calculateTotalMealCalories(mealName){
  let totalMealCalories = 0
  $(`table.${mealName} .total`).each(function(){
    totalMealCalories += parseFloat($(this).text())
  })
  return totalMealCalories
}

function addToMealTable(){
  $(".buttons").on("click", function(){
    let mealId = $(this).children().attr("class")
    let mealName = $(this).children().attr("value")
    collectTableSelection(mealId)
    calculateTotalMealCalories(mealName)
    removeCheckedBoxes()
    reloadTables()
  })
}

function deleteClickedRows(){
  $(".icon-button").on("click", function(){
    let mealId = $(this).closest("div").attr("id")
    let idOfFood = $(this).closest("tr").find(".food-name").attr("id")
    let foodName = $(this).closest("tr").find(".food-name").text()
    $.ajax({
      url: "https://quantified-self-node.herokuapp.com/api/v1/meals/" + mealId + "/foods/" + idOfFood,
      type: "DELETE",
      success: function(result){
        alert("Successfully deleted " + foodName)
      }
    })
    $(this).closest("tr").remove()
    reloadTables()
  })
}

function reloadTables() {
  eraseTableContents()
  updateTableContents()
}

function eraseTableContents() {
  $(".meal").remove()
}

function addDeleteButtons(){
  if(!$(".total").next().length){
    $(".total").after('<td><input class=remove-row type=button value=delete /></td>')
  }
}

function collectTableSelection(mealId){
  $.each($("#foodTable :checkbox:checked"), function(){
    let idOfFood = $(this).closest("tr").find("td:eq(3)").children().attr("id")
    $.post("https://quantified-self-node.herokuapp.com/api/v1/meals/" + mealId + "/foods/" + idOfFood, function(data){
    })
    let foodName = $(this).closest("td").next().text()
    let foodCalories = $(this).closest("td").next().next().text()
    $("#" + mealId + " table tbody").append(`<tr><td class=food-name id=${idOfFood}>` + foodName + "</td><td>" + foodCalories + "</td><td><input class=remove-row type=button value=delete /></td></tr>")
  })
}

function removeCheckedBoxes(){
  $("#foodTable input:checkbox").prop("checked", false)
}

function addCheckboxes(){
  if(!$(".left2 tr").find(".food-checkbox").length > 0){
    $(".left2 > #foodTable > tbody").find(".list").prepend('<td class="food-checkbox"><input type="checkbox"/></td>')
    $(".left2 > #foodTable > tbody").find("#headers").prepend('<span/>')
  }
}

function hideDeleteButtons(){
  $(".left2 > #foodTable > tbody").find(".delete-row").hide()
}

function calorieCounter(mealName, i, totalReturnedMealCalories){
  let goalCalories = [400, 200, 600, 800][i]
  $(`table.${mealName} > tfoot > tr#total`).append("<td class='sum'>" + totalReturnedMealCalories + "</td>")
  let remainingCalories = (goalCalories - totalReturnedMealCalories)
  $(`table.${mealName} > tfoot > tr#goal`).append("<td>" + remainingCalories + "</td>")
  $(`table.${mealName} > tfoot > tr#goal > td`).addClass('green')
  $(`table.${mealName} > tfoot > tr#goal > td:contains('-')`).addClass('red')
}

function totalCalories(){
  let caloriesConsumed = 0
  $(".sum").each(function(){
    caloriesConsumed += parseFloat($(this).text())
  })
  $(".total-calories").append($totalsTable)
  $("tr#total-calories > th:eq(1)").html(caloriesConsumed)
  $("tr#total-goal > td").html((2000 - caloriesConsumed))
  $("tr#total-goal > td").addClass('green');
  $("tr#total-goal > td:contains('-')").addClass('red')
}

function generateTable(meal){
  let table = new Table()
  if (meal.id === 1) {
    $("div.left").append(table.tableBody.addClass(meal.name).addClass("meal"))
  }else if (meal.id === 2) {
    $("div.right").append(table.tableBody.addClass(meal.name).addClass("meal"))
  }else if (meal.id === 3) {
    $("div.left1").append(table.tableBody.addClass(meal.name).addClass("meal"))
  }else if (meal.id === 4) {
    $("div.right1").append(table.tableBody.addClass(meal.name).addClass("meal"))
  }
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

const $totalsTable = $('<table/>').append(
  $("<tfoot/>").append(
    $("<tr/>", {
      id: "total"
    }).append(
      $("<th/>").text("Goal Calories"),
      $("<th/>").text(2000)),
    $("<tr/>", {
      id: "total-calories"
    }).append(
      $("<th/>").text("Calories Consumed"),
      $("<th/>")),
    $("<tr/>", {
      id: "total-goal"
    }).append(
      $("<th/>").text("Remaining Calories"),
      $("<td />")))
).addClass("meal")
