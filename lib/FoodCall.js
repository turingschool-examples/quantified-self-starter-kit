const postURL   = "https://quantified-self-node.herokuapp.com/api/v1/foods"
const getURL    = "https://quantified-self-node.herokuapp.com/api/v1/foods"
const herokuURL = `https://quantified-self-node.herokuapp.com`
const FoodTable = require('./FoodTable')

const getFoods = () => {
  $.get(`${postURL}`)
    .then(function (foods){
      foods.reverse()
      FoodTable.buildTable()
      FoodTable.addFoodData(foods)
    })
}

const postFood = () => {
  $.ajax({
    url: `${postURL}`,
    type: 'POST',
    data: { food: { name: `${$(".new-food-name").val()}`, calories: `${$(".new-food-calories").val()}`} },
    success: function(response) {
      getFoods();
    },
    error: function() {
      console.log(error)
    }
  })
}

const deleteFood = (itemId, deleteRow) => {
    $.ajax({
      url: `${herokuURL}/api/v1/foods/${itemId}`,
      type: 'DELETE',
      success: function() {
        deleteRow.remove()
      },
      error: function() {
        console.log(error)
      }
    })
  }

const updateFood = (foodId, newName, newCalories) => {
  $.ajax({
    url: `${herokuURL}/api/v1/foods/${foodId}`,
    type: 'PUT',
    data: { food: { name: `${newName}`, calories: `${newCalories}`} },
    success: function(response) {
      getFoods();
    },
    error: function() {
      console.log(error)
    }
  })
}


module.exports = { postFood, getFoods, deleteFood, updateFood }
