// const getFoods = require('../requests/foods')
import {getFoods, postFood} from "../requests/foods"

// if (window.location.pathname == '/foods.html') {

  const onLoad = $(document).ready(function() {
    getFoods()
  })

  const clickSubmit = $('#new-food-submit').on('click', function(event){
    console.log('clicked')
    event.preventDefault()
    const food = $('#food').val()
    const calories = $('#calories').val()

    if (food === "") {
      alert("Please enter food")
    }
    else if (calories === "") {
      alert("Please enter calories")
    }
    else {
      postFood(food, calories)
    }
  })
// }

module.exports = {onLoad, clickSubmit}
