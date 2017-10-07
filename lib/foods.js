$(document).ready(function(){
  $.get("https://hidden-shelf-49347.herokuapp.com//api/v1/foods")
    .then(function(foods){
      foods.forEach(function(food){
        // debugger
          $("#foodTable").find('tbody')
            .append($('<tr>')
              .append($(`<td contenteditable=true>${food.name}</td> <td>${food.calories}</td><td> <button type="button" value="delete"> Remove </button></td>`)
                )
            )
      });
    });
});
