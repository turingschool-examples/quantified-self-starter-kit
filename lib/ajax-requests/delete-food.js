const $ = require('jquery')

function deleteFood(id) {
  $.ajax({
      url: `https://quantified-self-aabs.herokuapp.com/api/v1/foods/${id}`,
      type: 'DELETE',
      success: function(result) {
        alert(`You deleted food id=${id}!`)
      },
      error: function(result) {
        alert(`You must delete the meals this food belongs to in order to delete it.`)
      }
  });
}

export { deleteFood }
