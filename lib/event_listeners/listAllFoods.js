const $ = require('jquery')
const Food = require('../models/Food')

$(document).ready(function(){
  Food.allFoods().then((data)=>{
    data.forEach(function(object) {
      $(".food-body").prepend("<tr class=food item-" + object.id + "><td data-id=" + object.id +" name=" + object.name.replace(/\s/g, '-') +" data-type='name' class='display' contenteditable='true'>" + object.name + "</td><td data-id=" + object.id +" name=" + object.calories + " data-type='calories' class='display' contenteditable='true'><span class='killer'><i class='fa fa-minus-circle' aria-hidden='true' style='font-size:24px'></i></span>" + object.calories + "</td></tr>")
    })
  })
})
