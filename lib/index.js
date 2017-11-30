$(document).ready(function() {
  var $foodTable = $(".food-table");
  var $name = $("input[name='name']");
  var $calories = $("input[name='calories']");
  var url = 'http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods';

  $.getJSON('http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods', function(data) {
    data.forEach(function(food){
      $('.food-table').prepend(`<tr><td>${food.name}</td><td>${food.calories}</td><td>delete</td></tr>`)
    })
  });


  $('#add_food').on("click", function(ev) {
    ev.preventDefault();

    var foodPost = {
      food: {
        name: $name.val(),
        calories: $calories.val(),
      }
    };

  $.ajax({
      type: 'POST',
      url: url,
      data: foodPost,
      dataType: 'json',
      success: function(data) {
        $('.food-table').prepend(`<tr><td>${data.name}</td><td>${data.calories}</td><td>delete</td></tr>`);
        return false;
      },
      error: function(err) {
        console.log(err);
        alert("There was an error");
      }
    })
  });
})
