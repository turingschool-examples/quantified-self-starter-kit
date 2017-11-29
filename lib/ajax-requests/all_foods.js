//
const $ = require('jquery')
const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"
const foodsJson = getAllFoods();

function getAllFoods() {
    $.ajax({url: url, success: function(result){
        return result
    }});
};

exports.foodsJson = foodsJson
