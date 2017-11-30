//
const $ = require('jquery')

const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"
// let foodsJson = getAllFoods();

function getAllFoods() {
    $.ajax({
        url: url,
        success: function(data) {
            return data
        }
    });
};

function useReturnData(data){
  for (var i = 0; i < data.length; i++) {
    $("#list").append(`<li> Name: ${data[i].name} | Calories: ${data[i].calories} | delete_icon.png </li>`)
  }
};

const foodsJson = getAllFoods();

export { foodsJson };
