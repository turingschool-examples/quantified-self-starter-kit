const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";

const getAllFoods = function() {
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  }).done(function(data) {
    console.log(data);
    for(var i = 0; data.length; i++) {
      $('#new_food_table').append('<tr data-id=' + data[i].id + '><td>' + data[i].name + '</td><td>' + data[i].calories + '</td><td class="delete_row">X</td></tr>');
    }
  }).fail(function() {
    handleError();
  })
};

  // var getSingleFood = function() {
  //   var postId = $(".show-form input[name='show-id']").val();
  //
  //   return $.ajax({
  //     url: API + '/api/v1/foods/:id' + postId,
  //     method: 'GET',
  //   }).done(function(data) {
  //     $('#latest-posts').append('<p class="post">' + data.description + '</p>');
  //   }).fail(function() {
  //     handleError();
  //   })
  // }
  //
const createNewFood = function() {
  var foodName = $(".new_food_form input[name='food_name']").val();
  var calorieCount = $(".new_food_form input[name='calorie_count']").val();
  return $.ajax({
    url: API + '/api/v1/foods',
    method: 'POST',
    data: { food: {name: foodName, calories: calorieCount} }
  }).done(function(data) {
    console.log(data)
    $('#new_food_table').prepend('<tr><td>' + foodName + '</td><td>' + calorieCount + '</td><td class="delete_row">X</td></tr>');
  }).fail(function(error) {
    handleError(error);
  })
};
  //
  // var updateFood = function() {
  //   var foodId = $(".update-form input[name='update-name']").val();
  //   var updateDescription = $(".update-form input[name='food-description']").val();
  //
  //   return $.ajax({
  //     url: API + '/api/v1/foods/' + foodId,
  //     method: 'PUT',
  //     data: { post: {food: updateDescription} },
  //   }).done(function(data) {
  //     $('#latest-posts').append('<p class="post">New post has been updated.</p>');
  //   }).fail(function() {
  //     handleError();
  //   })
  // }
  //
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

  // $('button[name="button-fetch"]').on('click', getAllFoods);
  // $(".show-form input[type='submit']").on('click', getSingleFood);
  $('.new_food_form input[type="submit"]').on('click', function(event){
    event.preventDefault();
    createNewFood();
  });
  // $('.update-form input[type="submit"]').on('click', updateFood);
  $('#new_food_table').on('click','.delete_row' ,function(event) {
    deleteFood(event);
  });
getAllFoods()
