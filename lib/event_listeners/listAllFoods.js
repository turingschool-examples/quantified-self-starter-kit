const $ = require('jquery')
const Food = require('../models/Food')

$(document).ready(function(){
  Food.allFoods().then((data)=>{
    data.forEach(function(object) {
      $("tbody").prepend("<tr class=food item-" + object.id + "><td data-id=" + object.id +" name=" + object.name.replace(/\s/g, '-') +" data-type='name' class='display' contenteditable='true'>" + object.name + "</td><td data-id=" + object.id +" name=" + object.calories + " data-type='calories' class='display' contenteditable='true'>" + object.calories + "</td></tr>")
    })
  })
})
