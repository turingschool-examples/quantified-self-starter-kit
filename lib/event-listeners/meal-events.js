import {getMeals} from "../requests/meals"

if (window.location.pathname == '/') {
  const onIndexLoad = $(document).ready(function() {
    getMeals()
  })

  // const clickSubmit = $('#new-food-submit').on('click', function(event){
  //   console.log('clicked')
  //   event.preventDefault()
  //   const food = $('#food').val()
  //   const calories = $('#calories').val()
  //
  //   if (food === "") {
  //     alert("Please enter food")
  //   }
  //   else if (calories === "") {
  //     alert("Please enter calories")
  //   }
  //   else {
  //     postFood(food, calories)
  //   }
  // })
}

module.exports = {onIndexLoad}
