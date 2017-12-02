const $ = require('jquery')
const apiURL = "https://q-self-api-mlwd.herokuapp.com/"

module.exports = class Ajax{

  static getAllMeals(){
    return $.getJSON(`${apiURL}/api/v1/meals`)
  }

  static getFood(id){
    return $.getJSON(`${apiURL}/api/v1/foods/${id}`)
  }

  static deleteMealFood(meal, food){
    return $.ajax({
      method: "DELETE",
      url: (`${apiURL}/api/v1/meals/${meal}/foods/${food}`)
    })
  }
}
