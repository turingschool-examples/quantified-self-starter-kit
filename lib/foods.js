const herokuURL = "https://quantified-self-node.herokuapp.com"
const FoodCall  = require('./FoodCall')
const FoodHandler  = require('./FoodHandler')

$(document).ready(function(){
  FoodCall.getFoods()
  FoodHandler.deleteHandler()
  FoodHandler.createHandler()
  FoodHandler.updateHandler()
  FoodHandler.descHandler()
  FoodHandler.ascHandler()
  errorMessage()
  FoodHandler.searchFoods()
});


function errorMessage(){
  $( ".sub-name" ).hide();
  $( ".sub-calories" ).hide();
}
