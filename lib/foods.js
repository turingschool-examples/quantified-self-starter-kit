$(document).ready(function(){
  $.get("https://hidden-shelf-49347.herokuapp.com//api/v1/foods")
    .then(function(foods){
      createFoodTable(foods);
      foods.forEach(function(food){
        // debugger
          $("#foodTable").find('tbody')
            .append($('<tr>')
              .append($(`<td contenteditable=true>${food.name}</td> <td>${food.calories}</td><td><input type=button name=delete-food id=${food.id} value=delete </td>`)
                )
            )
      });
    });
});

function createFoodTable(foods) {
	var table=$("<table id=foodTable>").appendTo('#food-table'),
		tbody=$("<tbody>").appendTo(table),
    headersRow=$("<tr id=headers>").appendTo(tbody),
    headerName=$("<th>").text("Food Name").appendTo(headersRow),
    headerCalories=$("<th>").text("Calories").appendTo(headersRow)
  };
