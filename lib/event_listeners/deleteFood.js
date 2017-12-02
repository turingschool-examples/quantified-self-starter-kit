const $ = require('jquery')
const Ajax = require('../ajax_requests/ajax')

$("#food-list").click(function(e){
  let objectId = e.target.parentElement.parentElement.dataset.id
  let row = e.target.parentElement.parentElement.parentElement
  Ajax.deleteFood(objectId, row)
})
