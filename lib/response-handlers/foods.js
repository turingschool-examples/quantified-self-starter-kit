var $ = require('jquery')

var appendPosts = function(data) {
  data.forEach(function(food){
    $('.food-table').prepend(`<tr data-id="${food.id}"><td contenteditable="true">${food.name}</td><td contenteditable="true"><i class="delete-button fa fa-minus-circle" aria-hidden="true"></i>${food.calories}</td></tr>`)
  })
}

var errorLog = function(data) {
  console.error(data)
}

module.exports = {
  appendPosts,
  errorLog
}
