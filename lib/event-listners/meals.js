var $ = require('jquery')
var ajaxReq = require('../AJAX-requests/meals')

var deleteListener = function () {
  $('tbody').on('click', function () {
    if ($(event.target).hasClass('delete-button')) {
      ajaxReq.deleteFood()
    }
  })
}

module.exports = {
  deleteListener
}
