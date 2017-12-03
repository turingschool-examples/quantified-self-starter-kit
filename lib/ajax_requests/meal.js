const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";

function getAllMeals() {
  $.ajax({
    url: API + '/api/v1/meals',
    method: 'GET',
  }).done(function(data) {
    data.forEach(function(meal) {
      meal.foods.forEach(function(food) {
        $(`#${meal.name.toLowerCase()} #foods-header`).after('<tr><td class="food-name-cell">' + food.name + '</td><td class="calorie-cell">' + food.calories + '</td></tr>');
      })
    })
  }).fail(function(){
    handleError();
  })
};

// function getBreakfastMealCalories() {
//   var target = document.getElementById('breakfast');
//   var items = target.getElementsByClassName('calorie-cell');
//   var sum   = 0;
//   for(var i = 0; i < items.length; i++) {
//     return sum += parseInt(items[i].value)
//   }
//   // debugger
//   console.log(items)
//   // console.log(sum)
//   $('#breakfast-cals').after('<tr><td class="breakfast-totals' + sum + '</td></tr>')
// }

// function getBreakfastMealCalories() {
//   var sum = 0;
//   var $dataRows = $("#breakfast td:not('.food-name-cell, totalcal')");
//
//   $dataRows.each(function() {
//     $(this).find('.calorie-cell').each(function() {
//       sum += parseInt($(this).html());
//     });
//     $('#breakfast td.totalcal').each(function() {
//       $(this).html("total:" + sum);
//     });
//   });
// }


function getBreakfastMealCalories() {
  var total = 0;
  $('#breakfast .meal-table').each(function() {
    total += parseInt($(this).find('.calorie-cell').text());
  });
  console.log(total);
}

var handleError = function(error) {
  console.log(error.statusText);
  console.log(error.responseText);
}

getAllMeals();
getBreakfastMealCalories();
// getMealCalories();
