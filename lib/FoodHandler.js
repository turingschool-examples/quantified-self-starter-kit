const FoodCall = require('./FoodCall')


const deleteHandler = () => {
  $(document).on('click','.delete-food', function(){
    let itemId = this.id
    let deleteRow = this.parentElement.parentElement
    FoodCall.deleteFood(itemId, deleteRow)
  })
}

const createHandler = () => {
  $(".add-food-form").submit(function( event ) {
    if ( $( ".new-food-name" ).val().length === 0 & $( ".new-food-calories" ).val().length === 0) {
      event.preventDefault();
      $(".sub-name").show();
      $(".sub-calories").show();
    } else if ( $( ".new-food-name" ).val().length === 0) {
      event.preventDefault();
      $(".sub-calories").hide();
      $(".sub-name").show();
    } else if ( $( ".new-food-calories" ).val().length === 0) {
      event.preventDefault();
      $(".sub-name").hide();
      $(".sub-calories").show();
    } else {
      FoodCall.postFood();
    }
  });
}

const updateHandler = () => {
  $(document).on('focus','#foodTable td', function(){
    $(this).data("initialText", $(this).html());
    $(document).on('blur','td', function() {
      if ($(this).data("initialText") == $(this).html()) {
        event.preventDefault();
      } else {
        let newName     = $(this.parentElement.children[0]).html()
        let newCalories = $(this.parentElement.children[1]).html()
        let foodId      = `${this.parentElement.id}`
        FoodCall.updateFood(foodId, newName, newCalories)
      }
      })
    })
  }


module.exports = { deleteHandler, createHandler, updateHandler }
