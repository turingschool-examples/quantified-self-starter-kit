let localURL = "http://localhost:3000"

$(document).ready(function(){

// start of AJAX call to get all foods currently in db
  function getFoods(){
    $.get(`${localURL}/api/v1/foods`)
      .then(function(foods){
        foods.reverse();
        createFoodTable(foods); // reverse list of foods in response
        foods.forEach(function(food){
            $("#foodTable").find('tbody')
              .append($('<tr class=list>')
                .append($(`<td id=${food.id} class=edit-name contenteditable=true>${food.name}</td> <td class=edit-calories contenteditable=true>${food.calories}</td><td><input class=delete-food type=button name=delete-food id=${food.id} value=delete </td>`)
                  )
              )
        });
      });
    } // end of getFoods();

    // call these functions upon page load
    getFoods();
    errorMessage();
    createFoodHandler();
    // foodsFilterHandler();
    // listenToEdit();
    // $.ajax({
    //     type: 'PATCH',
    //     url: `${localURL}api/v1/foods/61`,
    //     beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    //     data: { food: { name: "honey"} },
    //     success: function(response) {
    //       getFoods();
    //     },
    //     error: function() {
    //       debugger;
    //       alert("Error")
    //     }
    //   })
    // updateFood();
    //end of document.ready
  });

// listener for food items editing


// function listenToEdit(){
  $(document).on('focus','td', function(){
   $(this).data("initialText", $(this).html());
    $(document).on('blur','td', function() { // does this logic work if updating more than one td element at a time
        // ...if content is different...
        if ($(this).data("initialText") == $(this).html()) {
          event.preventDefault();
        } else {
            const newName     = $(this.parentElement.children[0]).html()
            const newCalories = $(this.parentElement.children[1]).html()
            const foodId      = `${this.id}`;
            // const data = { "[food]": newName}
            debugger;
            // console.log($(this).html());
              $.ajax({
                  url: `${localURL}/api/v1/foods/${foodId}`,
                  type: 'PATCH',
                  data: { food: { name: `${newName}`, calories: "5"} },
                  success: function(response) {
                    // debugger;
                    getFoods();
                  },
                  error: function() {
                    debugger;
                    alert("Error")
                  }
                })
    };
});
})

$('#searchInput').keyup(function() {
    filter(this);
});

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


// handler for search input to filter
// function foodsFilter(){
//
//
// }
//
// function foodsFilterHandler(){
//   $("#searchInput").keyup(function(){
//   let data = this.value.split(" ");
//   let filterValue = $("#foodTable").find("tr.list");
//   evaluateFilterValue(data, filterValue);
// })
// }
//
// function evaluateFilterValue(data, filterValue){
//   if ($("#searchInput")["0"].value == "") {
//       filterValue.show();
//       return;
//     }
//   filterValue.hide();
//   filterValue.filter(function (i, v) {
//       let t = `${$("#searchInput")[0].value}`; // this should be all thr rows not just the one
//          for (let d = 0; d < data.length; ++d) {
//            debugger
//             if ($`${t}`.is(":contains('" + data[d] + "')")) {
//                  return true;
//              }
//          }
//          return false;
//      })
//      .show();
// }


// $("#searchInput").keyup(function () {
//   let data = this.value.split(" ");
//   //create a jquery object of the rows
//   let filterValue = $("#foodTable").find("tr.list");
//
//
//   if (this.value == "") {
//       filterValue.show();
//       return;}
// // search for matches start
//   filterValue.hide();
//   filterValue.filter(function (i, v) {
//          var $t = $(this);
//          for (var d = 0; d < data.length; ++d) {
//              if ($t.is(":contains('" + data[d] + "')")) {
//                  return true;
//              }
//          }
//          return false;
//      })
//      //show the rows that match.
//      .show();
// });




// upon loading page, make error message invisible with jQuery effects

function errorMessage(){
  $( ".sub-name" ).hide();
  $( ".sub-calories" ).hide();
}
// new food form handler works
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


function createFoodTable(foods) {
	var table=$("<table id=foodTable>").appendTo('#food-table'),
		tbody=$("<tbody>").appendTo(table),
    headersRow=$("<tr id=headers>").appendTo(tbody),
    headerName=$("<th>").text("Food Name").appendTo(headersRow),
    headerCalories=$("<th>").text("Calories").appendTo(headersRow),
    newFoodRow=$("<tr id=result>").appendTo("table tr:last")
  };
