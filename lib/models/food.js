const $ = require('jquery')

function Food(food, calories) {
  this.name = name;
  this.calories = calories;
}

// var app = new function() {
//   var foodElements = document.getElementById('foods');
//   var edibles = [{name: 'orange', calories: 34}, {name: 'French Silk Pie', calories: 340}, {name: 'Banana', calories: 34}, {name: 'Deep Dish Pizza', calories: 890}, {name: 'Spinach Salad with Dressing', calories: 240}, {name: 'Roasted Cauliflower', calories: 80}, {name: 'Chicken Breast', calories: 210}, {name: 'Dark Chocolate', calories: 150}];
//
//   this.Count = function(data) {
//    var el = document.getElementById('counter');
//    var name = 'food';
//    if (data) {
//     if (data > 1) {
//      name = 'foods';
//     }
//     el.innerHTML = data + ' ' + name ;
//    } else {
//     el.innerHTML = 'No ' + name;
//    }
//   };
//
//   this.FetchAll = function() {
//    var data = '';
//    if (edibles.length > 0) {
//     for (var i = 0; i < edibles.length; i++) {
//       console.log(i);
//      data += '<tr>';
//      data += '<td>' + edibles[i].name + '</td>';
//      data += '</tr>';
//      data += '<tr>';
//      data += '<td>' + edibles[i].calories + '</td>';
//      data += '</tr>';
//      console.log(data);
//     }
//    }
//
//    this.Count(edibles.length);
//    return foodElements.innerHTML = data;
//   };
// }
//
// app.FetchAll();






// Food.prototype.edit = function () {
//   //Some cool storage stuff here
// };

module.exports = Food;
