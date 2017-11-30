const $ = require('jquery')
const Food = require('../models/Food')

$(document).ready(function(){
  Food.allFoods().then((data)=>{
    data.forEach(function(object) {
      $("tbody").append("<tr class=food-" + object.id + "><td><span class='display'>" + object.name + "</span><input type='text' class='edit' style='display:none'/></td><td><span class='display'>" + object.calories + "</span><input type='text' class='edit' style='display:none'/></td></tr>")
    })
  })
})
