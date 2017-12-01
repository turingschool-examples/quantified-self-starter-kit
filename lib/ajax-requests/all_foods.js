const $ = require('jquery')

const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"
function foodsResponse() {
  return $.ajax({
    type: "GET",
    url: url,
  })
}

export { foodsResponse }
