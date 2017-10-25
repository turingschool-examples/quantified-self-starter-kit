const postURL   = "https://quantified-self-node.herokuapp.com/api/v1/foods"

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

module.exports = { postFood }
