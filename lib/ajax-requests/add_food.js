const $ = require('jquery')

export { createFood }
import { appendFood } from "../response-handlers/append-food.js"

const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"

function createFood(foodObject) {
  $.post(url, {food: foodObject})
  .then(appendFood(foodObject))
}

//
// $.post( "ajax/test.html", function( data ) {
//   $( ".result" ).html( data );
// });
