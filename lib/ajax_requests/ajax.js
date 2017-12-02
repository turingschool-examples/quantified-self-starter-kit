const $ = require('jquery')
const api_url = "https://q-self-api-mlwd.herokuapp.com"

module.exports = class Ajax{

  static getAllMeals(){
    return $.getJSON(`${api_url}/api/v1/meals`)
  }

  static getFood(id){
    return $.getJSON(`${api_url}/api/v1/foods/${id}`)
  }

  static getAllFoods(){
    return $.getJSON(`${api_url}/api/v1/foods`)
  }

  static postFoods(name, calories){
    const params = { food: { name: name, calories: calories} }
    return $.post(`${api_url}/api/v1/foods`, params)
    .catch(errorLog)
  }

  static updateFood(food, id){
    $.ajax({
      url: `${api_url}/api/v1/foods/${id}`,
      type: 'PUT',
      data: food,
      success: function(data) {
        alert('Food successfully updated.');
      }
    })
  }
  static deleteFood(id, row){
    $.ajax({
      url: `${api_url}/api/v1/foods/${id}`,
      type: 'DELETE',
      success: function(callback) {
        alert('Food successfully deleted.');
        row.remove()
      }
    })
  }
}
