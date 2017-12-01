const $ = require('jquery')

function deleteFood(id) {
  $.ajax({
      url: `https://quantified-self-aabs.herokuapp.com/api/v1/foods/${id}`,
      type: 'DELETE',
      success: function(result) {
        alert(`You deleted food id=${id}!`)
      },
      error: function(result) {
        alert(`Food id=${id} could not be deleted`)
      }
  });
}

export { deleteFood }