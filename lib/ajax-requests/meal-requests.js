const $ = require('jquery')
const url = "https://quantified-self-aabs.herokuapp.com/api/v1/meals"

function mealsResponse() {
  return $.get(url)
}

export { mealsResponse }
