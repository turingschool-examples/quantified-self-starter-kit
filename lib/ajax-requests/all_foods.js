const $ = require('jquery')

const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"
let foodsResponse = $.ajax({
        url: url,
        success: function(data) {
            return data
        }
    });

export { foodsResponse };
