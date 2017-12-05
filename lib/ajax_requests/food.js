const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";

const getAllFoods = function() {
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  }).done(function(data) {
    for(var i = 0; data.length; i++) {
      $('#new_food_table').append('<tr data-id=' + data[i].id + '><td class="food-name-cell">' + data[i].name + '</td><td class="calorie-cell">' + data[i].calories + '</td><td class="delete_row">X</td></tr>');
    }
  }).fail(function() {
    handleError();
  })
};

const searchFoods = function() {
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  }).done(function(data) {
      foods = data.sort(function(a, b) {
        return a.id - b.id
      })
  }).fail(function() {
    handleError();
  })
};

const createNewFood = function() {
  var foodName = $(".new_food_form input[name='food_name']").val();
  var calorieCount = $(".new_food_form input[name='calorie_count']").val();
  return $.ajax({
    url: API + '/api/v1/foods',
    method: 'POST',
    data: { food: {name: foodName, calories: calorieCount} }
  }).done(function(data) {
    // console.log(data)
    $('#new_food_table').prepend('<tr><td class="food-name-cell">' + foodName + '</td><td class="calorie-cell">' + calorieCount + '</td><td class="delete_row">X</td></tr>');
  }).fail(function(error) {
    handleError(error);
  })
};

const updateFood = function(event) {
  var $parentNode = $(event.currentTarget.parentElement)
  var id = $parentNode.data().id
  var foodName = $parentNode.children(".food-name-cell")[0].textContent
  var calories = $parentNode.children(".calorie-cell")[0].textContent

  return $.ajax({
    url: API + '/api/v1/foods/' + id,
    method: 'PATCH',
    data: { food: { name: foodName, calories: calories} },
  }).done(function(data) {
  }).fail(function() {
    handleError();
  })
}

const deleteFood = function(event) {
  var id = event.currentTarget.parentElement.dataset.id
  return $.ajax({
    url: API + '/api/v1/foods/' + id,
    method: 'DELETE',
  }).done(function(data) {
    event.currentTarget.parentElement.remove();
  }).fail(function(error) {
    handleError(error);
  })
}

var handleError = function(error) {
  console.log(error.statusText);
  console.log(error.responseText);
}

  $('#search-foods').on('keyup', filterFoods);
  $('.new_food_form input[type="submit"]').on('click', function(event){
    event.preventDefault();
    createNewFood();
  });
  $('#new_food_table').on('click', '.food-name-cell, .calorie-cell', function(event) {
    $(event.currentTarget).attr('contenteditable','true');
  });
  $('#new_food_table').on('blur', '.food-name-cell, .calorie-cell', function(event) {
    if (event.currentTarget.contentEditable === 'true') {
    $(event.currentTarget).attr('contenteditable','false');
    updateFood(event);
    }
  });
  $('#new_food_table').on('click','.delete_row' ,function(event) {
    deleteFood(event);
  });

  const filterFoods = function() {
  let filter = $('#search-foods').val().toUpperCase()
  $('.food-name-cell').each(function() {
    if($(this).text().toUpperCase().includes(filter)){
      $(this).parent().show()
    } else {
      $(this).parent().hide()
    }
  })
}

getAllFoods()
searchFoods()
