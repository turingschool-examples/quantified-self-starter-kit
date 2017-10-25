const FoodCall = require('./FoodCall')


const deleteHandler = () => {
  $(document).on('click','.delete-food', function(){
    let itemId = this.id
    let deleteRow = this.parentElement.parentElement
    FoodCall.deleteFood(itemId, deleteRow)
  })
}


module.exports = { deleteHandler }
