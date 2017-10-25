const herokuURL = "https://quantified-self-node.herokuapp.com"
const postURL   = "/api/v1/foods"

const postFood = () => {
  $.ajax({
    url: `${localURL + postURL}`,
    type: 'POST',
    data: { food: { name: `${$(".new-food-name").val()}`, calories: `${$(".new-food-calories").val()}`} },
    success: function(response) {
      debugger
      getFoods();
    },
    error: function() {
      alert("Error post food")
    }

  })
}

module.exports = { postFood }
