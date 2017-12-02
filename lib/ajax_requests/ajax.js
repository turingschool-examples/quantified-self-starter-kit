const $ = require('jquery')
const apiURL = "https://q-self-api-mlwd.herokuapp.com"

module.exports = class Ajax{

  static getAllMeals(){
    return $.getJSON(`${apiURL}/api/v1/meals`)
  }

  static addFoodToMeal(mealID, foodID){
    return $.ajax({
      method: "POST",
      url: (`${apiURL}/api/v1/meals/${mealID}/foods/${foodID}`)
    })
  }

  static getFood(id){
    return $.getJSON(`${apiURL}/api/v1/foods/${id}`)
  }
  static getAllFood(id){
    return $.getJSON(`${apiURL}/api/v1/foods`)
  }

  static deleteMealFood(meal, food){
    return $.ajax({
      method: "DELETE",
      url: (`${apiURL}/api/v1/meals/${meal}/foods/${food}`)
    })
  }

  static getAllFoods(){
    return $.getJSON(`${apiUrl}/api/v1/foods`)
  }

  static postFoods(name, calories){
    const params = { food: { name: name, calories: calories} }
    return $.post(`${apiUrl}/api/v1/foods`, params)
    .catch(errorLog)
  }

  static updateFood(food, id){
    $.ajax({
      url: `${apiUrl}/api/v1/foods/${id}`,
      type: 'PUT',
      data: food,
      success: function(data) {
        alert('Food successfully updated.');
      }
    })
  }
  static deleteFood(id, row){
    $.ajax({
      url: `${apiUrl}/api/v1/foods/${id}`,
      type: 'DELETE',
      success: function(callback) {
        alert('Food successfully deleted.');
        row.remove()
      }
    })
  }
}
