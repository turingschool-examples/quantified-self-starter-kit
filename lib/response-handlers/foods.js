var $ = require('jquery')

var appendPosts = function(data) {
  data.forEach(function(food){
    $('.food-table').prepend(`<tr data-id="${food.id}"><td contenteditable="true">${food.name}</td><td contenteditable="true"><i class="delete-button fa fa-minus-circle" aria-hidden="true"></i>${food.calories}</td></tr>`)
  })
}


var searchTable = function(value) {
  $(".food-table tr").each(function() {
    var found = 'false';
    $(this).each(function() {
      if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        found = 'true';
      }
    });
    if(found == 'true') {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}


var errorLog = function(data) {
  console.error(data)
}

module.exports = {
  appendPosts,
  errorLog,
  searchTable
}
