//
const $ = require('jquery')
const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"

function getAllFoods() {
    $.ajax({url: url, success: function(result){
        return result
    }});
});
