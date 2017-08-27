var $ = require('jquery')

function Food(food) {
  this.id = food.id;
  this.name = food.name;
  this.calories = food.calories;
}

Food.prototype.toHTML = function(page) {
  return `<tr class="food-row">` +
  `<td class="food-name" data-id="${this.id}" id="${this.id}" contenteditable="true">${this.name}</td>`+
  `<td class="food-calories" id="${this.id}" contenteditable="true">${this.calories}</td>`
  + eval(`this.${page}()`)
}

// Food.prototype.toHTMLDiary = function(data) {
//   return `<tr class="food-row">` +
//   `<td class="food-name" data-id="${this.id}">${this.name}</td>`+
//   `<td class="food-calories">${this.calories}</td>`+
//   `<td><input class="checkbox" type="checkbox" id="checkbox ${this.id}"></td></tr>` 

Food.prototype.index = function() {
  return `<td class="trash-can-space"><a><input type="image" src="public/trash-can.png" class="trash-can" id=${this.id} alt="a trash can"/></a></td></tr>`
}

Food.prototype.diary = function() {
  return `<td class="checkbox"><input class="checkbox" type="checkbox" id="checkbox ${this.id}"</td></tr>`
}

Food.delete = function(foodID) {
  return $.ajax({
    url: `https://shrouded-headland-61661.herokuapp.com/api/v1/foods/` + foodID,
    type: 'DELETE',
    dataType: "json",
    error: function(error) {
      alert("Cannot delete food")
    }
  }).done(function(response) {
    return response
  })
}

Food.removeFood = function(element) {
  $('.food-row').each(function() {
    if (this.firstChild.attributes['id'].value == element) {
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
      if($('.foods-table').length) {
        return food.toHTML('index');
      } else {
        return food.toHTML('diary');
      }
      // return food.toHTML();
    })
  })
}

Food.getAllFoods = function() {
  return $.ajax({
    type: "GET",
    url: 'https://shrouded-headland-61661.herokuapp.com/api/v1/foods',
    dataType:"json",
  })
  .done(function(data) {
    return data;
  })
  .fail(function(error) {
    alert('Unable to request foods')
  })
}

// Food.getAFood = function(food) {
//   return $.ajax({
//     type: "GET",
//     url: `https://shrouded-headland-61661.herokuapp.com/api/v1/foods/${food}`,
//     dataType:"json",
//   })
//   .done(function(data) {
//     return data;
//   })
//   .fail(function(error) {
//     alert('Unable to request foods')
//   })
// }

Food.editFood = function(food) {
  return $.ajax({
    type: "PATCH",
    url: 'https://shrouded-headland-61661.herokuapp.com/api/v1/foods/' + food.id,
    dataType: "json",
    data: { food: food },
    error: function(error) {
      alert("Food could not be edited")
    }
  }).done(function(post) {
    return post
  })
}

module.exports = Food
