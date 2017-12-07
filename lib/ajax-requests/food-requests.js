const $ = require('jquery')
const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"

function deleteFood(id) {
  $.ajax({
      url: `${url}/${id}`,
      type: 'DELETE',
      success: (result) => {
        $(`#${id}`).remove()
        alert(`You deleted food id=${id}!`)
      },
      error: (result) => {
        alert(`You must delete the meals this food belongs to in order to delete it.`)
      }
  })
}

function updateFood(foodObject) {
  $.ajax({
      url: `${url}/${foodObject.id}`,
      data: {food: foodObject},
      type: 'PATCH'
  })
}

function foodsResponse() {
  return $.get(url)
}

function createFood(foodObject) {
  return $.post(url, {food: foodObject})
}

export { createFood, deleteFood, updateFood, foodsResponse }
