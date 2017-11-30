var $ = require('jquery')

var appendPosts = function(data) {
  data.forEach(function(food){
    $('.food-table').prepend(`<tr><td>${food.name}</td><td>${food.calories}</td><td>delete</td></tr>`)
  })
}

var errorLog = function(data) {
  console.error(data)
}

module.exports = {
  appendPosts,
  errorLog
}
