var $ = require('jquery')

var searchFood = function searchFood(input, context) {
  var found = 'false';
    $(context).each(function() {
      if($(context).text().toLowerCase().indexOf(input.toLowerCase()) >= 0) {
        found = 'true';
      }
    });
    (found == 'true') ? $(context).show() : $(context).hide();
  };

module.exports = { searchFood }
