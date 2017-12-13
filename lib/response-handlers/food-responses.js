const $ = require('jquery')

export function renderNewFoodTable(data) {
  for(var i = 0; data.length; i++) {
    $('#new_food_table').append('<tr data-id=' + data[i].id + '><td class="food-name-cell">' + data[i].name + '</td><td class="calorie-cell">' + data[i].calories + '</td><td class="delete_row">X</td></tr>');
  };
}

export function filterFoods() {
  let filter = $('#search-foods').val().toUpperCase()
  $('.food-name-cell').each(function() {
    if($(this).text().toUpperCase().includes(filter)){
      $(this).parent().show()
    } else {
      $(this).parent().hide()
    }
  })
}

export function addNewFood(data) {
  $('#new_food_table').prepend('<tr><td class="food-name-cell">' + data.name + '</td><td class="calorie-cell">' + data.calories + '</td><td class="delete_row">X</td></tr>');
}

export function handleError(error) {
  console.log(error.statusText);
  console.log(error.responseText);
}

export function sortByCaloriesDesc(event) {
  var columns = event.delegateTarget.children[1].children
  var sortedColumns = Array.prototype.slice.call(columns).sort(function(a,b) {
    var ac = Number(a.children[1].outerText)
    var bc = Number(b.children[1].outerText)
    if(ac > bc) {
      return 1;
    }
    if(ac < bc) {
      return -1;
    }
    return 0;
  });
  sortedColumns.forEach(function(column) {
    $('#new_food_table').append(column);
  })
}

export function sortByCaloriesAsc(event) {
  var columns = event.delegateTarget.children[1].children
  var sortedColumns = Array.prototype.slice.call(columns).sort(function(a,b) {
    var ac = Number(a.children[1].outerText)
    var bc = Number(b.children[1].outerText)
    if(ac > bc) {
      return -1;
    }
    if(ac < bc) {
      return 1;
    }
    return 0;
  });
  sortedColumns.forEach(function(column) {
    $('#new_food_table').append(column);
  })
}

export function sortByCaloriesOrig(event) {
  var columns = event.delegateTarget.children[1].children
  var sortedColumns = Array.prototype.slice.call(columns).sort(function(a,b) {
    var ac = Number(a.dataset.id)
    var bc = Number(b.dataset.id)
    if(ac > bc) {
      return -1;
    }
    if(ac < bc) {
      return 1;
    }
    return 0;
  });
  sortedColumns.forEach(function(column) {
    $('#new_food_table').append(column);
  })
}
