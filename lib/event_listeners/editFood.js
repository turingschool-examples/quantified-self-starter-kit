const $ = require('jquery')
const Ajax = require('../ajax_requests/ajax')

$("#food-list").focusout(function(e) {
  let newFoodValue = e.target.textContent.replace(/\s/g, '-')
  let currentFoodValue = e.target.attributes[1].value
  let objectId = e.target.attributes[0].value
  if ((newFoodValue != currentFoodValue) && (e.target.attributes[2].value === "name")){
    let calories = e.target.nextElementSibling.textContent
    let food = { food: {
        name: newFoodValue,
        calories: calories
      }
    }
    Ajax.updateFood(food, objectId)
  } else {
    let name = e.target.previousElementSibling.textContent
    let food = { food: {
        name: name,
        calories: newFoodValue
      }
    }
    Ajax.updateFood(food, objectId)
  }
});


