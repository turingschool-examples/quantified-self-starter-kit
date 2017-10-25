const herokuURL = "https://quantified-self-node.herokuapp.com"
const FoodCall  = require('./FoodCall')
const FoodHandler  = require('./FoodHandler')

$(document).ready(function(){
  FoodCall.getFoods()
  FoodHandler.deleteHandler()
  errorMessage()
  createFoodHandler()
  searchFoods()
  // listenToEdit();
});


$(document).on('focus','#foodTable td', function(){
  $(this).data("initialText", $(this).html());
  $(document).on('blur','td', function() { // does this logic work if updating more than one td element at a time
    // ...if content is different...
    if ($(this).data("initialText") == $(this).html()) {
      event.preventDefault();
    } else {
      const newName     = $(this.parentElement.children[0]).html()
      debugger
      const newCalories = $(this.parentElement.children[1]).html()
      const foodId      = `${this.parentElement.id}`;
      $.ajax({
        url: `${herokuURL}/api/v1/foods/${foodId}`,
        type: 'PUT',
        data: { food: { name: `${newName}`, calories: `${newCalories}`} },
        success: function(response) {
          getFoods();
        },
        error: function() {
          alert("Error")
        }
      })
    };
  });
})

function searchFoods() {
$('#searchInput').keyup(function() {
  filter(this)
})
}
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

function errorMessage(){
  $( ".sub-name" ).hide();
  $( ".sub-calories" ).hide();
}

// new food form handler
// function createFoodHandler(){
//   $(".add-food-form").submit(function( event ) {
//     if ( $( ".new-food-name" ).val().length === 0 & $( ".new-food-calories" ).val().length === 0) {
//       event.preventDefault();
//       $(".sub-name").show();
//       $(".sub-calories").show();
//     } else if ( $( ".new-food-name" ).val().length === 0) {
//       event.preventDefault();
//       $(".sub-calories").hide();
//       $(".sub-name").show();
//     } else if ( $( ".new-food-calories" ).val().length === 0) {
//       event.preventDefault();
//       $(".sub-name").hide();
//       $(".sub-calories").show();
//     } else {
//       FoodCall.postFood();
//     }
//   });
// }
