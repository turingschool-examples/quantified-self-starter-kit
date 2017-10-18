let localURL = "http://localhost:3000"

$(document).ready(function(){
    // call these functions upon page load
    getFoods();
    errorMessage();
    createFoodHandler();
    // foodsFilterHandler();
    // listenToEdit();
  });

// start of AJAX call to get all foods currently in db
  function getFoods(){
    $.get(`${localURL}/api/v1/foods`)
      .then(function(foods){
        foods.reverse();
        createFoodTable(); // reverse list of foods in response
        foods.forEach(function(food){
            $("#foodTable").find('tbody')
              .append($(`<tr id=${food.id} class=list>`)
                .append($(`<td class=edit-name contenteditable=true>${food.name}</td> <td class=edit-calories contenteditable=true>${food.calories}</td><td class=delete-row><input class=delete-food type=button name=delete-food id=${food.id} value=delete </td>`)

                  )
              )
        });
      });
    } // end of getFoods();

// listener for food items editing
// function listenToEdit(){
  $(document).on('focus','#foodTable > td', function(){
   $(this).data("initialText", $(this).html());
    $(document).on('blur','td', function() { // does this logic work if updating more than one td element at a time
        // ...if content is different...
        if ($(this).data("initialText") == $(this).html()) {
          event.preventDefault();
        } else {
            const newName     = $(this.parentElement.children[0]).html()
            const newCalories = $(this.parentElement.children[1]).html()
            const foodId      = `${this.parentElement.id}`;
              $.ajax({
                  url: `${localURL}/api/v1/foods/${foodId}`,
                  type: 'PATCH',
                  data: { food: { name: `${newName}`, calories: `${newCalories}`} },
                  success: function(response) {
                    // debugger;
                    getFoods();
                  },
                  error: function() {
                    //debugger;
                    alert("Error")
                  }
                })
    };
});
})

// food filter handler
$('#searchInput').keyup(function() {
    filter(this);
});

//foods filtering case insensitive
function filter(element){
    let inputValue = $(element).val().toLowerCase();
    let tableRows = $("#foodTable").find("tr.list")
    tableRows.hide();
    tableRows.each(function (index) {
        let $currentData = $(this).text();
        let $lower = $currentData.toLowerCase();
          if ($lower.indexOf(inputValue) > -1) {
            $(this).show()
            return true;
          }
        });
        return false;
  }


// upon loading page, make error message invisible with jQuery effects //

function errorMessage(){
  $( ".sub-name" ).hide();
  $( ".sub-calories" ).hide();
}

// new food form handler
function createFoodHandler(){
  $(".add-food-form").submit(function( event ) {
    if ( $( ".new-food-name" ).val().length === 0 & $( ".new-food-calories" ).val().length === 0) {
      event.preventDefault();
      $(".sub-name").show();
      $(".sub-calories").show();
    } else if ( $( ".new-food-name" ).val().length === 0) {
      event.preventDefault();
      $(".sub-name").show();
    } else if ( $( ".new-food-calories" ).val().length === 0) {
      event.preventDefault();
      $(".sub-calories").show();
    } else {
        createFoodCall();
        }
 });
}

// start ajax post call
function createFoodCall(){
  $.ajax({
    url: `${localURL}/api/v1/foods`,
    type: 'POST',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    data: { food: { name: `${$(".new-food-name").val()}`, calories: `${$(".new-food-calories").val()}`} },
    success: function(response) {
      getFoods();
    }
  });
}
// end of ajax post call function


function createFoodTable() {
	var table=$("<table id=foodTable>").appendTo('#food-table'),
		tbody=$("<tbody>").appendTo(table),
    headersRow=$("<tr id=headers>").appendTo(tbody),
    headerName=$("<th>").text("Food Name").appendTo(headersRow),
    headerCalories=$("<th>").text("Calories").appendTo(headersRow),
    newFoodRow=$("<tr id=result>").appendTo("table tr:last")
  };
