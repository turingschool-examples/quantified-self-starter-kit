var $ = require('jquery')
var ajaxReq = require('../AJAX-requests/meals')

var deleteListener = function () {
  $('tbody').on('click', 'i.delete-button', function () {
      ajaxReq.deleteFood()
  })
}

module.exports = {
  deleteListener
}
