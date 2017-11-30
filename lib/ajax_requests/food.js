const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";

function getAllFoods() {
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  }).done(function(data) {
    console.log(data);
    for(var i = 0; data.length; i++) {
      $('#new_food_table').append('<tr><td>' + data[i].name + '</td><td>' + data[i].calories + '</td></tr>');
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
function createNewFood() {
  var foodName = $(".new_food_form input[name='food_name']").val();
  var calorieCount = $(".new_food_form input[name='calorie_count']").val();
  return $.ajax({
    url: API + '/api/v1/foods',
    method: 'POST',
    data: { food: {name: foodName, calories: calorieCount} }
    console.log
  }).done(function(data) {
    $('#latest-posts').prepend(''<tr><td>' + foodName + '</td><td>' + calorieCount + '</td></tr>'');
  }).fail(function() {
    handleError();
  })
}
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
  // var deleteFood = function() {
  //   var foodId = $(".delete-form input[name='delete-food']").val();
  //
  //   return $.ajax({
  //     url: API + '/api/v1/foods/' + foodId,
  //     method: 'DELETE',
  //   }).done(function(data) {
  //     $('#latest-posts').append('<p class="post">This post has been deleted.</p>');
  //   }).fail(function() {
  //     handleError();
  //   })
  // }

var handleError = function() {
  $('#new_food_table').prepend('<tr><td> Something went wrong. Try again later</td><ßtd>no count</td></tr>');
}

  // $('button[name="button-fetch"]').on('click', getAllFoods);
  // $(".show-form input[type='submit']").on('click', getSingleFood);
  // $('.post-form input[type="submit"]').on('click', createNewFood);
  // $('.update-form input[type="submit"]').on('click', updateFood);
  // $('.delete-form input[type="submit"]').on('click', deleteFood);
  module.exports = getAllFoods
  module.exports = createNewFood
