const $ = require('jquery')
const api_url = "https://q-self-api-mlwd.herokuapp.com/"

module.exports = class Ajax{

  static getAllMeals(){
    return $.getJSON(`${api_url}/api/v1/meals`)
  }
}
