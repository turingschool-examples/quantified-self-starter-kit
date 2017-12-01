function deleteFood() {
  $('.delete-button').on('click', function() {
    var foodId = $(this).data('id')
    $.get(`http://quantified-self-api-aa-ya.herokuapp.com/api/v1/meals`)
      .then(function(meals) {
        var mealIds = meals.filter(function(meal) {
          return meal.foods.includes(`id: ${foodId}`)
          })
        meals.forEach(function(meal) {
          meal.foods.forEach(function(food) {
            debugger;
          })
        })
      })
    $.ajax({
      url: `http://quantified-self-api-aa-ya.herokuapp.com/api/v1/foods/${foodId}`,
      type: 'DELETE',
      dataType: "json",
    })
    .then(function(data) {
      return data
      $(this).parent().remove()
    })
    .fail(function(error) {
      alert("food not deleted")
    })
  })
}
