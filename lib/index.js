$(document).ready(function() {
  $.getJSON('http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods', function(data) {
    data.forEach(function(food){
      $('.food-table').append(`<tr><td>${food.name}</td><td>${food.calories}</td><td>delete</td></tr>`)
    })
  })
})
