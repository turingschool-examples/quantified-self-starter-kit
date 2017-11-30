function populateFood() { $.getJSON('http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods')
  .then(function(data) {
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
