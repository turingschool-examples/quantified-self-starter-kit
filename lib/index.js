function deleteFood() {
  $('.delete-button').on('click', function() {
    var foodId = $(this).siblings()[0].innerHTML
    $(this).parent().remove()
    $.ajax({
      url: `http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods/${foodId}`,
      type: 'DELETE',
      success: alert("food deleted"),
      data: data
    });
  })
}

function populateFood() { $.getJSON('http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods', function(data) {
  data.forEach(function(food){
    $('.food-table').append(`<tr><td class="no-show">${food.id}</td><td>${food.name}</td><td>${food.calories}</td><td class="delete-button"><button type="button">Delete</button></td></tr>`)
    $('.no-show').hide()
    deleteFood()
  })
})
}
$(document).ready(function() {
  populateFood()
})
