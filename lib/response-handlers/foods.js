var $ = require('jquery')

var appendPosts = function(data) {
  data.forEach(function(food){
    $('.food-table').prepend(`<tr data-id="${food.id}"><td>${food.name}</td><td>${food.calories}</td><td><button class="delete-button">Delete</button></td></tr>`)
  })
}

var errorLog = function(data) {
  console.error(data)
}

module.exports = {
  appendPosts,
  errorLog
}
