const herokuURL = "https://quantified-self-node.herokuapp.com"
const FoodCall  = require('./FoodCall')
const FoodHandler  = require('./FoodHandler')

$(document).ready(function(){
  FoodCall.getFoods()
  FoodHandler.deleteHandler()
  FoodHandler.createHandler()
  FoodHandler.updateHandler()
  errorMessage()
  searchFoods()
  // listenToEdit();
});




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
