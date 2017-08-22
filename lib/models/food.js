var $ = require('jquery')

function Food(food) {
  this.id = food.id;
  this.name = food.name;
  this.calories = food.calories;
}

Food.prototype.toHTML = function() {
  return `<tr class="food_row">` +
  `<td class="food-name" data-id="${this.id}">${this.name}</td>`+
  `<td class="food_calories">${this.calories}</td>`+
  `<td><a><input type="image" src="public/trash_can.png" class="trash-can" id=${this.id} alt="a trash can"/></a></td></tr>`
}

Food.prototype.toHTMLDiary = function(data) {
  return `<tr class="food_row">` +
  `<td class="food-name" data-id="${this.id}">${this.name}</td>`+
  `<td class="food_calories">${this.calories}</td>`+
  `<td><input class="checkbox" type="checkbox"</td></tr>`
}

Food.delete = function(foodID) {
  return $.ajax({
    url: `http://localhost:3000/api/v1/foods/` + foodID,
    type: 'DELETE',
    dataType: "json",
    error: function(error) {
      // alert("Cannot delete food")
    }
  }).done(function(response) {
    return response
  })
}

Food.removeFood = function(element) {
  $('.food_row').each(function() {
    if (this.firstChild.attributes['data-id'].value == element) {
      this.remove()
    }
  })
}

Food.allFoodsToHTML = function() {
  return this.getAllFoods()
  .then(function(foodList) {
    return foodList.map(function(food) {
      return new Food(food);
    }).sort(function(a, b) {
      return b.id - a.id;
    })
  })
  .then(function(foodList) {
    return foodList.map(function(food) {
      if($('.foods_table').length) {
        // debugger
        return food.toHTML();
      } else {
        // debugger
        return food.toHTMLDiary();
      }
      // return food.toHTML();
    })
  })
}

Food.getAllFoods = function() {
  return $.ajax({
    type: "GET",
    url: 'http://localhost:3000/api/v1/foods',
    dataType:"json",
  })
  .done(function(data) {
    return data;
  })
  .fail(function(error) {
    debugger
  })
}

module.exports = Food
